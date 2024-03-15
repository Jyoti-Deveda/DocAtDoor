const { createProfile } = require('../Controllers/Doctor');
const { auth } = require('../Middlewares/auth');

const Router = require('express').Router();

Router.post('/create-general-profile', auth, createProfile)