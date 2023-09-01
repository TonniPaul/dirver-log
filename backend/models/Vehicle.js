const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
	  make: {
		  type: String,
		  required: true
	  },
	  model: {
		  type: String,
		  required: true
	  },
	  licensePlate: {
		  type: String,
		  required: true,
		  validate: {
			validator: function (value) {
        	// Regular expression to match the format AAA1234
			return /^[A-Z]{3}\d{1,4}$/.test(value);
		},
		message: 'License plate must be in the format AAA1234'
	}
}
}, { timestamps: true
});

const Vehicle = mongoose.model('Vehicle', VehicleSchema);
module.exports = Vehicle;