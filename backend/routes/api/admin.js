const express = require('express');
const router = express.Router();
const {
  getAdmin,
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getAdminProfile,
} = require('../../controllers/adminController');
const protect = require('../../middleware/authMiddleware');

// routes
router.get('/', protect, getAdmins);
router.get('/me', protect, getAdminProfile);
router.post('/create-admin', createAdmin);
router
  .route('/:id')
  .get(protect, getAdmin)
  .put(protect, updateAdmin)
  .delete(protect, deleteAdmin);

module.exports = router;
