const express = require('express');
const router = express.Router();


router.post('/register', (request, response) => {
    response.json("new user created");
})
router.post('/login', (request, response) => {
    response.json("user logged in");
})
router.get('/current', (request, response) => {
    response.json("Current use info");
})

module.exports = router;