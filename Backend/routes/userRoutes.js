const express = require('express');
const { userRegister, generateVerificationToken, verifyEmail, login, logout,  } = require('../Controllers/auth');
const router = express.Router();


router.post('/register', userRegister, generateVerificationToken);
router.post('/login', login);
router.post('/logout', logout);
router.post('/generate-verification-token', generateVerificationToken);
router.post('/verify-email', verifyEmail);



// router.post('/login', (request, response) => {
//     response.json("user logged in");
// })

// router.get('/current', (request, response) => {
//     response.json("Current use info");
// })

module.exports = router;