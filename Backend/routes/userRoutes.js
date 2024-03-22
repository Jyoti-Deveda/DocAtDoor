const express = require('express');
const { userRegister, generateVerificationToken, verifyEmail, login, logout, changePassword, updateDisplayPicture,  } = require('../Controllers/auth');
const { auth } = require('../Middlewares/auth');
const router = express.Router();


router.post('/register', userRegister, generateVerificationToken);
router.post('/login', login);
router.post('/logout', logout);
router.post('/generate-verification-token', generateVerificationToken);
router.post('/verify-email', verifyEmail);
router.post('/change-password', auth, changePassword)
router.put('/update-profile-image', auth, updateDisplayPicture);

module.exports = router;