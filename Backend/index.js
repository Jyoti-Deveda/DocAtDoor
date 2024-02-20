const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config;

// connect database here 

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/users', require('./routes/userRoutes'));



app.get('/', (req, res) => {
    console.log("This is a default route")
})

exports.runPythonScripts = () => {

}

app.listen(port, () => {
    console.log(`App is running at ${port}`);
})