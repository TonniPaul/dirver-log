const TripLog = require('../models/TripLog');
const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');
const Admin = require('../models/Admin');
const asyncHandler = require('express-async-handler');
// const SMSNotification = require('../utils/smsNotifications.js');
const { emailNotification } = require('../utils/emailNotifications.js');

const getTripLogs = asyncHandler(async (req, res) => {
  let query = {};
  // Check if the user is an admin
  if (req.user.role === 'admin') {
    query = {}; // Empty query means all triplogs
  } else {
    query.driver = req.user.id; // Only the user's own triplogs
  }
  try {
    const triplogs = await TripLog.find(query).populate('driver');
    res.json(triplogs);
  } catch (error) {
    console.error('Error:', error);
    res.status(500);
    throw new Error('Internal server error');
  }
});

const getTripLog = asyncHandler(async (req, res) => {
  try {
    const triplog = await TripLog.findById(req.params.id).populate('driver');
    if (!triplog) {
      return res.status(404).json({ error: 'No triplog found' });
    }
    res.json(triplog);
  } catch (err) {
    res.status(500);
    throw new Error('Internal server error');
  }
});

const createTripLog = asyncHandler(async (req, res) => {
  if (!req.body.destination && !req.body.endMileage) {
    // start trip
    try {
      if (
        !req.body.origin ||
        !req.body.startMileage ||
        !req.body.purpose ||
        !req.body.vehicle
      ) {
        return res.status(400).json({ error: 'Please fill in all fields' });
      }

      // Check if the rideId session variable is already set.
      if (!req.session.rideId) {
        // Initialize the rideId session variable to null.
        req.session.rideId = null;
      } else {
        // If the rideId session variable is already set, then the user is already on a trip.
        // Return an error.
        return res.status(400).json({ error: 'You are already on a trip' });
      }

      const newTripLog = new TripLog({
        origin: req.body.origin,
        startMileage: req.body.startMileage,
        purpose: req.body.purpose,
        vehicle: req.body.vehicle,
        driver: req.user.id,
      });

      // Set the session variable rideId to the triplog id
      // This is used to identify the triplog when ending the trip
      req.session.rideId = newTripLog._id;

      const triplog = await newTripLog.save();
      res.status(201).json(triplog);
      console.log(triplog._id);
      console.log(req.session.rideId);
    } catch (err) {

      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    if (req.body.destination && req.body.endMileage) {
      // end trip
      try {
        // Retrieve the triplog id from the session variable rideId
        const rideId = req.session.rideId;
        const triplog = await TripLog.findById(rideId);
        if (!triplog) {
          return res.status(404).json({ error: 'No triplog found' });
        }
        if (!req.user) {
          return res.status(404).json({ error: 'No user found' });
        }
        if (triplog.driver?.toString() !== req.user.id) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
        triplog.destination = req.body.destination;
        triplog.endMileage = req.body.endMileage;
        triplog.comments = req.body.comments;
        triplog.logDate = req.body.logDate;
        triplog.vehicle = req.body.vehicle;
        triplog.distance = req.body.distance;
        triplog.totalMileage = req.body.totalMileage;
        
        const updatedTripLog = await triplog.save();

        // Remove ride id from local storage
        req.session.rideId = null;

        // Send email notification to admin
        try {
          const driver = await Driver.findById(req.user.id);
          if (!driver) {
            return res.status(404).json({ error: 'No driver found' });
          }
          updatedTripLog.driver = driver;
        } catch (err) {
          console.log(err);
          res.status(500).json({ error: 'Internal server error' });
        }

        try {
          const admin = await Admin.findById(updatedTripLog.driver.admin);
          if (!admin) {
            return res.status(404).json({ error: 'No admin found' });
          }
          updatedTripLog.admin = admin;
        } catch (err) {
          console.log(err);
          res.status(500).json({ error: 'Internal server error' });
        }

        try {
          const vehicle = await Vehicle.findById(req.body.vehicle);
          if (!vehicle) {
            return res.status(404).json({ error: 'No vehicle found' });
          }
          updatedTripLog.vehicle = vehicle;
        } catch (err) {
          console.log(err);
          res.status(500).json({ error: 'Internal server error' });
        }

        const adminEmail = updatedTripLog.admin.email;
        await emailNotification(adminEmail, updatedTripLog, req);

        res.status(201).json(updatedTripLog);
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
});

const updateTripLog = asyncHandler(async (req, res) => {
  try {
    const triplog = await TripLog.findById(req.params.id);
    if (!triplog) {
      return res.status(404).json({ error: 'No triplog found' });
    }
    if (!req.user) {
      return res.status(404).json({ error: 'No user found' });
    }
    if (triplog.driver?.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const updatedTripLog = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedTripLog, { message: 'TripLog updated' });
  } catch (err) {
    res.status(500);
    throw new Error('Internal server error');
  }
});

const deleteTripLog = asyncHandler(async (req, res) => {
  try {
    const triplog = await TripLog.findById(req.params.id);
    if (!triplog) {
      return res.status(404).json({ error: 'No triplog found' });
    }
    if (!req.user) {
      return res.status(404).json({ error: 'No user found' });
    }
    if (triplog.driver?.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    await TripLog.findByIdAndRemove(req.params.id);
    res.json({ message: 'TripLog removed' });
  } catch (err) {
    res.status(500);
    throw new Error('Internal server error');
  }
});

module.exports = {
  getTripLogs,
  getTripLog,
  createTripLog,
  updateTripLog,
  deleteTripLog,
};
