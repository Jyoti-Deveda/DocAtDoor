const express = require('express');
const { userRegister, generateVerificationToken, verifyEmail, login, logout, changePassword, updateDisplayPicture, get_profile_image, } = require('../controllers/auth');
const { auth } = require('../Middlewares/auth');
const router = express.Router();


router.post('/register', userRegister, generateVerificationToken);
router.post('/login', login);
router.post('/logout', logout);
router.post('/generate-verification-token', generateVerificationToken);
router.post('/verify-email', verifyEmail);
router.post('/change-password', auth, changePassword)
router.post('/update-profile-image', auth, updateDisplayPicture);
router.get('/get-profile-image', auth, get_profile_image);

module.exports = router;