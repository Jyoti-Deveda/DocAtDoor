const { createProfile, getDoctorDetails, getDoctorsInfo, markAppointmentAttended, getDoctorsAppointments } = require('../Controllers/Doctor');
const { fetchScheduledDays, setScheduledDays } = require('../Controllers/ScheduleManager');
const { auth, isDoctor, isUserVerified } = require('../Middlewares/auth');

const express = require('express')
const Router = express.Router();

Router.post('/create-general-profile', auth, isUserVerified, isDoctor, createProfile);
Router.get('/get-doctor-details', auth, isUserVerified, isDoctor, getDoctorDetails);
Router.get('/get-scheduled-days', auth, isDoctor, fetchScheduledDays);
Router.post('/set-scheduled-days', auth, isDoctor, setScheduledDays);
Router.get('/get-doctors-info/:id', auth, getDoctorsInfo);
Router.post('/mark-appointment-attended/:id', auth, isDoctor, markAppointmentAttended);
Router.get('/doctors-appointments', auth, isDoctor, getDoctorsAppointments);


module.exports = Router;