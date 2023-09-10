const express = require('express');
const router = express.Router();
const { getDrivers, getDriver, createDriver, updateDriver, deleteDriver, getDriverProfile } = require('../../controllers/driverController');
const protect = require('../../middleware/authMiddleware');
const requireAdmin = require('../../middleware/requireAdminMiddleware');

router.get('/', protect, requireAdmin, getDrivers);
router.post('/signup-driver', protect, requireAdmin, createDriver);
router.get('/me', protect, getDriverProfile);
router.put('/profile', protect, updateDriver);
router.route('/:id').get(protect, getDriver).delete(protect, requireAdmin, deleteDriver);

module.exports = router;