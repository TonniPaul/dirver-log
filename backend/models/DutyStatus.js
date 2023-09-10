const mongoose = require('mongoose');

const DutyStatusSchema = new mongoose.Schema(
  {
    startDuty: {
      type: Date,
      default: Date.now,
    },
    endDuty: {
      type: Date,
    },
    totalWorkingHours: {
      type: Number,
      default: 0,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Driver',
    },
  },
  { timestamps: true }
);

// Calculate total working hours
DutyStatusSchema.pre('save', async function (next) {
  const dutystatus = this;
  if (dutystatus.isModified('startDuty') || dutystatus.isModified('endDuty')) {
    const timeDifference = dutystatus.endDuty - dutystatus.startDuty;
    dutystatus.totalWorkingHours = timeDifference / (1000 * 60 * 60); // Convert milliseconds to hours
  }
  next();
});

DutyStatusSchema.pre('findOneAndUpdate', async function (next) {
  const query = this; // `this` is the query object
  const originalDocument = await query.model.findOne(query.getQuery());

  if (originalDocument) {
    const timeDifference =
      originalDocument.endDuty - originalDocument.startDuty;
    query._update.totalWorkingHours = timeDifference / (1000 * 60 * 60); // Convert milliseconds to hours
  }

  next();
});

const DutyStatus = mongoose.model('DutyStatus', DutyStatusSchema);
module.exports = DutyStatus;
