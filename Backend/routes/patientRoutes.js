const express = require('express');
const { get_user_details } = require('../controllers/patient');
const { auth, isPatient } = require('../Middlewares/auth');
const router = express.Router();

router.get('/details', auth, isPatient, get_user_details);


module.exports = router;