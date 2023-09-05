const express = require('express');
const router = express.Router();
const { getTrips, getTrip, createTrip, updateTrip, deleteTrip } = require('../../controllers/tripsController');
const protect = require('../../middleware/authMiddleware');

router.route('/').get(protect, getTrips).post(protect, createTrip);
router.route('/:id').get(protect, getTrip).put(protect, updateTrip).delete(protect, deleteTrip);

module.exports = router;