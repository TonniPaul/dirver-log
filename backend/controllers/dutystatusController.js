const DutyStatus = require('../models/DutyStatus');
const asyncHandler = require('express-async-handler');

const getDutyStatuses = asyncHandler(async(req, res) => {
    let query = {};
    // Check if the user is an admin
    if (req.user.role === 'admin') {
        query = {}; // Empty query means all trips
    } else {
        query.driver = req.user.id; // Only the user's own trips
    }
    try {
        const dutyStatuses = await DutyStatus.find(query)
        .populate('driver');
        res.json(dutyStatuses);
    } catch (err) {
        res.status(500);
        throw new Error('Internal server error');
    }
});

const getDutyStatus = asyncHandler(async (req, res) => {
    try {
        const dutyStatus = await DutyStatus.findById(req.params.id)
        .populate('driver');
        if (!dutyStatus) {
            return res.status(404).json({ error: 'No duty status found' });
        }
        res.json(dutyStatus);
    } catch (err) {
        res.status(500);
        throw new Error('Internal server error');
    }
});

const createDutyStatus = asyncHandler(async (req, res) => {
    try {
        if (!req.body.startDuty || !req.body.endDuty) {
            return res.status(400).json({ error: 'Please fill in all fields' });
        }
        const newDutyStatus = new DutyStatus({
            startDuty: req.body.startDuty,
            endDuty: req.body.endDuty,
            totalWorkingHours: req.body.totalWorkingHours,
            driver: req.user.id
        });
        const dutyStatus = await newDutyStatus.save();
        res.status(201).json(dutyStatus);
    } catch (err) {
        res.status(500);
        throw new Error('Internal server error');
    }
});

const updateDutyStatus = asyncHandler(async (req, res) => {
    try {
        const dutystatus = await DutyStatus.findById(req.params.id);
        if (!dutystatus) {
            return res.status(404).json({ error: 'No duty status found' });
        }
        if (!req.user) {
            return res.status(404).json({ error: 'No user found' });
        }
        if (dutystatus.driver?.toString() !== req.user.id) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const updatedDutystatus = await DutyStatus.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedDutystatus) {
            return res.status(404).json({ error: 'No duty status found' });
        }

        res.status(200).json(updatedDutystatus);
    } catch (err) {
        console.log(err);
        res.status(500);
        throw new Error('Internal server error');
    }
});

const deleteDutyStatus = asyncHandler(async (req, res) => {
    try {
        const dutyStatus = await DutyStatus.findById(req.params.id);
    if (!dutyStatus) {
        return res.status(404).json({ error: 'No duty status found' });
    }
    if (!req.user) {
        return res.status(404).json({ error: 'No user found' });
    }

    // Check if the user is the owner of the duty status
    if (dutyStatus.driver?.toString() !== req.user.id) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    await DutyStatus.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: 'Duty status removed'
    });
    } catch (err) {
        res.status(500);
        throw new Error('Internal server error');
    }
});

module.exports = {
    getDutyStatuses,
    getDutyStatus,
    createDutyStatus,
    updateDutyStatus,
    deleteDutyStatus
};