const { createProfile, getDoctorDetails } = require('../Controllers/Doctor');
const { auth, isDoctor, isUserVerified } = require('../Middlewares/auth');

const express = require('express')
const Router = express.Router();

Router.post('/create-general-profile', auth, isUserVerified, isDoctor, createProfile);
Router.get('/get-doctor-details', auth, isUserVerified, isDoctor, getDoctorDetails);

module.exports = Router;