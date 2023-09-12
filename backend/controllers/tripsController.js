const Trip = require('../models/Trip');
const asyncHandler = require('express-async-handler');

const getTrips = asyncHandler(async(req, res) => {
    let query = {};
    // Check if the user is an admin
    if (req.user.role === 'admin') {
        query = {}; // Empty query means all trips
    } else {
        query.driver = req.user.id; // Only the user's own trips
    }
    try {
        const trips = await Trip.find(query)
        .populate('driver');
        res.json(trips);
    } catch (error) {
        console.error('Error:', error);
        res.status(500);
        throw new Error('Internal server error');
    }
});

const getTrip = asyncHandler(async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id)
        .populate('driver');
        if (!trip) {
            return res.status(404).json({ error: 'No trip found' });
        }
        res.json(trip);
    } catch (err) {
        res.status(500);
        throw new Error('Internal server error');
    }
});

const createTrip = asyncHandler(async (req, res) => {
    try {
        if (!req.body.origin || !req.body.destination || !req.body.startMileage || !req.body.endMileage || !req.body.purpose) {
            return res.status(400).json({ error: 'Please fill in all fields' });
        }
        const newTrip = new Trip({
            origin: req.body.origin,
            destination: req.body.destination,
            startMileage: req.body.startMileage,
            endMileage: req.body.endMileage,
            purpose: req.body.purpose,
            distance: req.body.distance,
            totalMileage: req.body.totalMileage,
            driver: req.user.id
        });
        const trip = await newTrip.save();
        res.status(201).json(trip);
    } catch (err) {
        res.status(500);
        throw new Error('Internal server error');
    }
});

const updateTrip = asyncHandler(async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) {
            return res.status(404).json({ error: 'No trip found' });
        }
        if (!req.user) {
            return res.status(404).json({ error: 'No user found' });
        }
        if (trip.driver?.toString() !== req.user.id) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const updateTrip = await Trip.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updateTrip, { message: 'Trip updated' });
    } catch (err) {
        res.status(500);
        throw new Error('Internal server error');
    }
});

const deleteTrip = asyncHandler(async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) {
            return res.status(404).json({ error: 'No trip found' });
        }
        if (!req.user) {
            return res.status(404).json({ error: 'No user found' });
        }
        // Check if the user is an admin
        if (trip.driver?.toString() !== req.user.id) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        await Trip.findByIdAndRemove(req.params.id);
        res.json({ message: 'Trip removed' });
    } catch (err) {
        res.status(500);
        throw new Error('Internal server error');
    }
});

module.exports = {
    getTrips,
    getTrip,
    createTrip,
    updateTrip,
    deleteTrip
};