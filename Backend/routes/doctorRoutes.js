const { createProfile } = require('../Controllers/Doctor');
const { auth, isDoctor } = require('../Middlewares/auth');

const express = require('express')
const Router = express.Router();

Router.post('/create-general-profile', auth, isDoctor, createProfile);

module.exports = Router;