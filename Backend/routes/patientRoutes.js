const express = require('express');
const { auth, isPatient } = require('../Middlewares/auth');
const { get_user_details, set_user_details, getDoctorsOfDisease } = require('../Controllers/patient');
const { runPythonScript } = require('../Controllers/runPython');
const router = express.Router();

router.get('/details', auth, isPatient, get_user_details).post('/details', auth, isPatient, set_user_details);
router.post('/get-disease-doctor', runPythonScript, getDoctorsOfDisease);
router.post('/get-doctors', getDoctorsOfDisease)

module.exports = router;