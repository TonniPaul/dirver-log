const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true,
	},
	licenseNumber: {
		type: Number,
		required: true
	},
	nationalId: {
		type: String,
		required: true
	},
	contactNumber: {
		type: Number,
		required: true
	},	
	email: {
		type: String,
		required: false,
		match: [
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
			'Email should be of the format johndoe@gmail.com',
		  ],
	},
	homeAddress: {
		type: String,
		required: true
	},
	licenseExpiryDate: {
		type: Date,
		required: true
	},
	role: {
		type: String,
		required: true,
		enum: ['driver', 'admin'],
		default: 'driver',
	},
	password: {
		type: String,
		required: true,
	},
}, { timestamps: true
});

const Driver = mongoose.model('Driver', DriverSchema);
module.exports = Driver;