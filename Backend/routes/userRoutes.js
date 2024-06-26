const express = require('express');
const { userRegister, generateVerificationToken, verifyEmail, login, logout, changePassword, updateDisplayPicture, get_profile_image, } = require('../Controllers/auth');
const { auth } = require('../Middlewares/auth');
const { bookAppointment } = require('../Controllers/Appointments');
const router = express.Router();

router.post('/register', userRegister, generateVerificationToken);
router.post('/login', login);
router.post('/logout', logout);
router.post('/generate-verification-token', generateVerificationToken);
router.post('/verify-email', verifyEmail);
router.post('/change-password', auth, changePassword)
router.post('/update-profile-image', auth, updateDisplayPicture);
router.get('/get-profile-image', auth, get_profile_image);
router.post('/book-appointment', auth, bookAppointment);

module.exports = router;