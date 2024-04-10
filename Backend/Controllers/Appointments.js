const expressAsyncHandler = require("express-async-handler");
const User = require("../Models/User");
const ScheduledDays = require("../Models/ScheduledDays");

exports.bookAppointment = expressAsyncHandler(async (req, res) => {

    const { userId } = req.user;
    const { doctorId, diseases, scheduledDay, timeslot } = req.body;

    const userDetails = await User.findById(userId).populate('patientsAppointments');

    if(!userDetails){
        res.status(404);
        throw new Error("User not found");
    }

    if(!doctorId || !diseases || !scheduledDay || timeslot){
        res.status(400);
        throw new Error("All fields are required");
    }

    const scheduledDayDetails = await ScheduledDays.findOne({ _id: scheduledDay._id, doctorId:doctorId });

    if(!scheduledDayDetails){
        res.status(404);
        throw new Error("Scheduled day not found");
    }

    

})