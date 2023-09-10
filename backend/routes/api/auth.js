const express = require('express');
const router = express.Router();
const { signinDriver, signinAdmin, logout } = require('../../controllers/authController');

router.post('/signin-driver', signinDriver);
router.post('/signin-admin', signinAdmin);
router.post('/logout', logout);

module.exports = router;