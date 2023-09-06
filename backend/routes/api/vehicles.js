const express = require('express');
const router = express.Router();
const { getVehicles, getVehicle, createVehicle, updateVehicle, deleteVehicle } = require('../../controllers/vehiclesController');
const protect = require('../../middleware/authMiddleware');
const requireAdmin = require('../../middleware/requireAdminMiddleware');

router.route('/').get(protect, getVehicles).post(protect, requireAdmin, createVehicle);
router.route('/:id').get(protect, getVehicle).put(protect, requireAdmin, updateVehicle).delete(protect, requireAdmin, deleteVehicle);

module.exports = router;