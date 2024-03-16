const { createProfile } = require('../Controllers/Doctor');
const { auth } = require('../Middlewares/auth');

const express = require('express')
const Router = express.Router();

Router.post('/create-general-profile', auth, createProfile)

module.exports = Router;