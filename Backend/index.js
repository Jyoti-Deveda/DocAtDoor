const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config;
const { spawn } = require("child_process")



const pythonRoutes = require("./routes/pythonScriptRoutes")
const userRoutes = require('./routes/userRoutes');
const dbConnect = require('./Config/database');
const errorHandler = require('./Middlewares/errorHandler');

// connect database here 
dbConnect();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:5173",
    methods:"*",
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/python', pythonRoutes)

app.use(errorHandler)

// const pythonProcess = spawn('python', ["../python/main.py"])

// const writableStream  = pythonProcess.stdin

// const test_data = ['skin_rash','nodal_skin_eruptions','continuous_sneezing','shivering','chills','joint_pain']

// writableStream.write(JSON.stringify(test_data))
// writableStream.end();  

// pythonProcess.stdout.on("data", (data) => {
//     response = data;
//     console.log(`stdout: ${data}`)
// })

// pythonProcess.stderr.on("err", (err) => {
//     console.log(`Error: ${err}`)
// })

// pythonProcess.on('exit', (code) => {
//     console.log("Python script exited with code ", code);
// })

app.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Server is up and running"
    })
})

app.listen(port, () => {
    console.log(`App is running at ${port}`);
})