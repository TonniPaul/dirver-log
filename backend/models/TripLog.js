const mongoose = require('mongoose');

const TripLogSchema = new mongoose.Schema(
  {
    startLng: { 
      type: Number
    },
    startLat: { 
      type: Number
    },
    originAddress: { 
      type: String
    },
    destinationAddress: { 
      type: String
    },
    purpose: { 
      type: String
    },
    driver: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Driver'
    },
    vehicle: { 
      type: String,
    },
    endLng: { 
      type: Number
    },
    endLat: { 
      type: Number
    },
    comments: { 
      type: String 
    },
    distance: { 
      type: String,
      get: v => `${Math.floor(v)}(Km)`,
    },
    status: {
      type: String,
      enum: ['ongoing', 'completed'],
      default: 'ongoing'
    }
},
{
  timestamps: true
}
);

// Calculate and set the distance before saving the document
TripLogSchema.pre('save', function(next) {
    const start = {
        lat: this.startLat,
        lon: this.startLng
    };
    const end = {
        lat: this.endLat,
        lon: this.endLng
    };
    
    // Calculate distance using Haversine formula
    const radius = 6371; // Earth's radius in kilometers
    const dLat = (end.lat - start.lat) * Math.PI / 180;
    const dLon = (end.lon - start.lon) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(start.lat * Math.PI / 180) * Math.cos(end.lat * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = radius * c;

    // Round down the distance and convert it to an integer
    this.distance = Math.floor(distance);
    
    next();
});

const Triplog = mongoose.model('Triplog', TripLogSchema);

module.exports = Triplog;
