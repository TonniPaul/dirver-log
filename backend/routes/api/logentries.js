const express = require('express');
const router = express.Router();
const { getLogEntries, getLogEntry, createLogEntry, updateLogEntry, deleteLogEntry } = require('../../controllers/logentriesController');
const protect = require('../../middleware/authMiddleware');

router.route('/').get(protect, getLogEntries).post(protect, createLogEntry);
router.route('/:id').get(protect, getLogEntry).put(protect, updateLogEntry).delete(protect, deleteLogEntry);

module.exports = router;