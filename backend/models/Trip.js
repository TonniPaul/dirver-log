// Load required packages
const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
	origin: {
		type: String,
		required: true
	},
	destination: {
		type: String,
		required: true
	},
	startMileage: {
		type: Number,
		required: true
	},
	endMileage: {
		type: Number,
		required: true
	},
	purpose: {
		type: String,
		required: true
	},
	distance: {
		type: Number
	},
	totalMileage: {
		type: Number
	},
	driver: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Driver',
		required: true
	}
}, { timestamps: true
});

// Calculate distance and total mileage before saving the trip
TripSchema.pre('save', function (next) {
	this.distance = calculateDistance(this.origin, this.destination);
  	this.totalMileage = this.endMileage - this.startMileage;
	next();
});

//using the Haversine formula to calculate the distance between
//two sets of latitude and longitude coordinates
function calculateDistance(origin, destination) {
	const [lat1, lon1] = origin.split(',').map(parseFloat);
	const [lat2, lon2] = destination.split(',').map(parseFloat);

	const earthRadius = 6371; // Radius of the Earth in kilometers

	// Convert latitude and longitude to radians
	const dLat = ((lat2 - lat1) * Math.PI) / 180;
	const dLon = ((lon2 - lon1) * Math.PI) / 180;

	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos((lat1 * Math.PI) / 180) *
		Math.cos((lat2 * Math.PI) / 180) *
		Math.sin(dLon / 2) *
		Math.sin(dLon / 2);

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = earthRadius * c;

	return distance;
  }

const Trip = mongoose.model('Trip', TripSchema);
module.exports = Trip;