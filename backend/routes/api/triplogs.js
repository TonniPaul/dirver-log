const express = require('express');
const router = express.Router();
const {
  getTripLogs,
  getTripLog,
  createTripLog,
  updateTripLog,
  deleteTripLog,
} = require('../../controllers/tripLogController');
const protect = require('../../middleware/authMiddleware');

router.route('/').get(protect, getTripLogs).post(protect, createTripLog);
router
  .route('/:id')
  .get(protect, getTripLog)
  .put(protect, updateTripLog)
  .delete(protect, deleteTripLog);

module.exports = router;
