const express = require('express');
const { userRegister } = require('../controllers/auth');
const router = express.Router();


router.post('/register', userRegister);
router.post('/login', (request, response) => {
    response.json("user logged in");
})
router.get('/current', (request, response) => {
    response.json("Current use info");
})

module.exports = router;