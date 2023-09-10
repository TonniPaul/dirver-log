const express = require('express');
const router = express.Router();
const {
  getDutyStatuses,
  getDutyStatus,
  createDutyStatus,
  updateDutyStatus,
  deleteDutyStatus,
} = require('../../controllers/dutystatusController');
const protect = require('../../middleware/authMiddleware');

router.route('/').get(protect, getDutyStatuses).post(protect, createDutyStatus);
router
  .route('/:id')
  .get(protect, getDutyStatus)
  .put(protect, updateDutyStatus)
  .delete(protect, deleteDutyStatus);

module.exports = router;
