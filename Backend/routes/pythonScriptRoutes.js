const express = require('express')
const { runPythonScript } = require('../Controllers/runPython')
const router = express.Router()

router.get('/run-python-script', runPythonScript);

module.exports = router;