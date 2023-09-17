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
  try {
    if (
      !req.body.origin ||
      !req.body.destination ||
      !req.body.startMileage ||
      !req.body.endMileage ||
      !req.body.purpose ||
      !req.body.logDate ||
      !req.body.comments ||
      !req.body.vehicle
    ) {
      return res.status(400).json({ error: 'Please fill in all fields' });
    }

    const newTripLog = new TripLog({
      origin: req.body.origin,
      destination: req.body.destination,
      startMileage: req.body.startMileage,
      endMileage: req.body.endMileage,
      purpose: req.body.purpose,
      distance: req.body.distance,
      totalMileage: req.body.totalMileage,
      logDate: req.body.logdate,
      comments: req.body.comments,
      vehicle: req.body.id,
      driver: req.user.id
    });

    try {
      const vehicle = await Vehicle.findById(req.body.vehicle);
      if (!vehicle) {
        return res.status(404).json({ error: 'No vehicle found' });
      }
      newTripLog.vehicle = vehicle;
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }

    try {
      const driver = await Driver.findById(req.user.id);
      if (!driver) {
        return res.status(404).json({ error: 'No driver found' });
      }
      newTripLog.driver = driver;
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }

    const triplog = await newTripLog.save();

    try {
      const admin = await Admin.findById(triplog.driver.admin);
      if (!admin) {
        return res.status(404).json({ error: 'No admin found' });
      }
      triplog.admin = admin;
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }

    // Send an SMS notification is out of credits: Twilio
    // const options = {
    //   message: `NEw triplog created by ${req.user.firstName + ' ' + req.user.lastName} : \n on: ${triplog.logDate} \n Distance: ${triplog.distance} \n Vehicle: ${triplog.vehicle.licensePlate} \n Pupose: ${triplog.purpose} \n Remarks: ${triplog.comments}`, 
    //   phoneNumber: triplog.admin.companyContactNo,
    // };

    const userEmail = triplog.driver.email;

    // await SMSNotification(options); // Ran out of trial account credits
    emailNotification(userEmail, triplog, req);

    res.status(201).json(triplog);

  } catch (err) {
    console.log(err);
    res.status(500);
    throw new Error('Internal server error');
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
