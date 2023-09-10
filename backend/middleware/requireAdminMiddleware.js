const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const asyncHandler = require('express-async-handler');
require('dotenv').config();

// Protect routes to only allow admin access
const requireAdmin = asyncHandler(async (req, res, next) => {
  try {
    // Get the access token from the cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: 'Not Authorized: No access tokens' });
    }

    // Verify the access token and extract the payload
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    // Check if the user is an admin
    if (payload.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Only admin access allowed' });
    }

    // Find the admin user by ID
    const admin = await Admin.findById(payload.userId).select('-password');
    if (!admin) {
      return res.status(403).json({ error: 'Forbidden: Admin not found' });
    }

    // Pass the admin user information to the request object
    req.user = admin;

    // Continue with the next middleware or route handler
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: 'Not Authorized: Invalid access token' });
  }
});

module.exports = requireAdmin;