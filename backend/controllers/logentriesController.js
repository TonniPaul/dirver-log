const LogEntry = require('../models/LogEntry');
const Vehicle = require('../models/Vehicle');
const Trip = require('../models/Trip');
const asyncHandler = require('express-async-handler');

const getLogEntries = asyncHandler(async(req, res) => {
    let query = {};
    // Check if the user is an admin
    if (req.user.role === 'admin') {
        query = {}; // Empty query means all trips
    } else {
        query.driver = req.user.id; // Only the user's own trips
    }
    try {
        const logEntries = await LogEntry.find(query)
        .populate('driver')
        .populate('vehicle')
        .populate('trip');
        res.json(logEntries);
    } catch (err) {
        console.log(err);
        res.status(500);
        throw new Error('Internal server error');
    }
});

const getLogEntry = asyncHandler(async (req, res) => {
    try {
        const logEntry = await LogEntry.findById(req.params.id)
        .populate('driver')
        .populate('vehicle')
        .populate('trip');
        if (!logEntry) {
            res.status(404).json({ error: 'No log entry found' });
        } else {
            res.json(logEntry);
        }
    } catch (err) {
        res.status(500);
        throw new Error('Internal server error');
    }
});

const createLogEntry = asyncHandler(async (req, res) => {
    try {
        if (!req.body.logDate || !req.body.vehicle || !req.body.trip || !req.body.comments) {
            return res.status(400).json({ error: 'Please fill in all fields' });
        }
        const newLogEntry = new LogEntry({
            logDate: req.body.logDate,
            vehicle: req.body.id,
            trip: req.body.id,
            comments: req.body.comments,
            driver: req.user.id
        });
        await Vehicle.findById(req.body.vehicle)
        .then(vehicle => {
            if (!vehicle) {
                return res.status(404).json({ error: 'No vehicle found' });
            }
            newLogEntry.vehicle = vehicle;
        })
        .catch(err => {
            console.log(err);
            res.status(500);
            throw new Error('Internal server error');
        });

        await Trip.findById(req.body.trip)
        .then(trip => {
            if (!trip) {
                return res.status(404).json({ error: 'No trip found' });
            }
            newLogEntry.trip = trip;
        })
        .catch(err => {
            console.log(err);
            res.status(500);
            throw new Error('Internal server error');
        });

        const logEntry = await newLogEntry.save();
        res.status(201).json(logEntry);
    } catch (err) {
        console.log(err);
        res.status(500);
        throw new Error('Internal server error');
    }
});

const updateLogEntry = asyncHandler(async (req, res) => {
    try {
        const logEntry = await LogEntry.findById(req.params.id);
        if (!logEntry) {
            return res.status(404).json({ error: 'No log entry found' });
        }
        if (!req.user) {
            return res.status(404).json({ error: 'No user found' });
        }
        if (logEntry.driver?.toString() !== req.user.id) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const updateLogEntry = await LogEntry.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updateLogEntry);
    } catch (err) {
        res.status(500);
        throw new Error('Internal server error');
    }
});

const deleteLogEntry = asyncHandler(async (req, res) => {
    try {
        const logEntry = await LogEntry.findById(req.params.id);
        if (!logEntry) {
            return res.status(404).json({ error: 'No log entry found' });
        }
        if (!req.user) {
            return res.status(404).json({ error: 'No user found' });
        }
        if (logEntry.driver?.toString() !== req.user.id) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        await LogEntry.findByIdAndRemove(req.params.id);
        res.json({ message: 'Log entry removed' });
    } catch (err) {
        res.status(500);
        throw new Error('Internal server error');
    }
});

module.exports = {
    getLogEntries,
    getLogEntry,
    createLogEntry,
    updateLogEntry,
    deleteLogEntry
};