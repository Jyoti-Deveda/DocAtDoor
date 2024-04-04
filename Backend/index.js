const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config;
const { spawn } = require("child_process")
const fileUpload = require('express-fileupload')

const dbConnect = require('./Config/database');
const errorHandler = require('./Middlewares/errorHandler');
const cookieParser = require('cookie-parser');

const pythonRoutes = require("./routes/pythonScriptRoutes")
const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');
const { cloudinaryConnect } = require('./Config/Cloudinary');

// connect database here 
dbConnect();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:5173",
    methods: "*",
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp',
    })
)

cloudinaryConnect();

app.use(express.json());
app.use(cookieParser())

app.use('/api/user', userRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/python', pythonRoutes);

app.use(errorHandler)

app.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Server is up and running"
    })
})

app.listen(port, () => {
    console.log(`App is running at ${port}`);
})