const express = require('express');
const { auth, isPatient } = require('../Middlewares/auth');
const { get_user_details, set_user_details } = require('../Controllers/Patient');
const router = express.Router();

router.get('/details', auth, isPatient, get_user_details).post('/details', auth, isPatient, set_user_details);


module.exports = router;