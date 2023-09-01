// models/Admin.js
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  email: {
		type: String,
		required: false,
		match: [
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
			'Email should be of the format johndoe@gmail.com',
		  ],
	},
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin'],
    default: 'admin',
    },
}, { timestamps: true
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;