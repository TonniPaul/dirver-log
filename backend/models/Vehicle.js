const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    licensePlate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model('Vehicle', VehicleSchema);
module.exports = Vehicle;
