const TripLog = require('../models/TripLog');
const Vehicle = require('../models/Vehicle');
const asyncHandler = require('express-async-handler');
const SMSNotification = require('../utils/smsNotifications.js');
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

    await Vehicle.findById(req.body.vehicle)
        .then(vehicle => {
            if (!vehicle) {
                return res.status(404).json({ error: 'No vehicle found' });
            }
            newTripLog.vehicle = vehicle;
        })
        .catch(err => {
            console.log(err);
            res.status(500);
            throw new Error('Internal server error');
        });

    const triplog = await newTripLog.save();

    // Send a notification
    const options = {
      message: `New log entry created by ${req.user.firstName + ' ' + req.user.lastName} : \n on: ${logEntry.logDate} \n Distance: ${logEntry.trip.distance} \n Vehicle: ${logEntry.vehicle.licensePlate} \n Pupose: ${logEntry.trip.purpose} \n Remarks: ${logEntry.comments}`, 
      phoneNumber: process.env.RECIPIENT_PHONE_NUMBER
    };

    const userEmail = process.env.RECIPIENT_EMAIL;

    await SMSNotification(options);
    emailNotification(userEmail, logEntry, req);

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
