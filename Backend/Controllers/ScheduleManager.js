const expressAsyncHandler = require("express-async-handler");
const DoctorsProfile = require("../Models/DoctorsProfile");
const ScheduledDays = require("../Models/ScheduledDays");

exports.fetchScheduledDays = expressAsyncHandler(async (req, res) => {

    const { userId } = req.user;

    const doctorDetails = await DoctorsProfile.findOne({doctorId: userId}).populate("workingDays")
    // console.log("Doctor details: ", doctorDetails);

    //check for scheduled days
    const scheduledDays = await ScheduledDays.find({
        doctorId: userId,
        date: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
    })
    .sort( { date: 1} )
    .limit(7);

    console.log("Scheduled days: ", scheduledDays);
    console.log("Scheduled days length: ", scheduledDays.length);

    //if 7 days data from today to next seven days is present simply return it
    if(scheduledDays && scheduledDays.length >= 7){
        return res.status(200).json({
            success: true,
            scheduledDays,
            message: "Scheduled days fetched successfully"
        })
    }

    var generatedDates = [];
    //since dates from the day user visits the page are fetched, generate dates for rest of the days
    
    if(!scheduledDays || scheduledDays?.length === 0){
        generatedDates = generateScheduledDays(Date.now(), 7);
    }
    else{
        let len = scheduledDays.length;
        const remainingDays = 7 - len;

        //this many dates need to be generated
        if(remainingDays != 0){
            generatedDates = generateScheduledDays(scheduledDays[len-1].date, remainingDays);
        }

    }
    console.log("Generated dates: ", generatedDates);

    //for the generated dates, create ScheduledDay document and save to db
    generatedDates.forEach(async (date) => {

        const newDate = await ScheduledDays.create({
            doctorId: userId,
            date: date,
        })

        scheduledDays.push(newDate);
    })

    console.log("Final scheduled days: ", scheduledDays)

    doctorDetails.workingDays = scheduledDays;
    await doctorDetails.save();

    
    res.status(200).json({
        success: true,
        ScheduledDays,
        message: "Scheduled days fetched successfully"
    })

})


const generateScheduledDays = (startDate, noOfDays) => {
    const scheduledDays = [];
    const currentDate = new Date(startDate);

    for (let i = 0; i < noOfDays; i++) {
        scheduledDays.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return scheduledDays;
};


exports.setScheduledDays = expressAsyncHandler(async (req, res) => {
    const { userId } = req.user;
    const { scheduledDays } = req.body;

    //scheduled days is an array of object
    if (!scheduledDays || scheduledDays.length === 0) {
        res.status(400);
        throw new Error("Scheduled day data is missing");
    }

    for (const day of scheduledDays) {
        if (!day.date || !day._id) {
            res.status(400);
            throw new Error("Date and doctor are required in each scheduled day data");
        }

        const updatedScheduledDay = await ScheduledDays.findOneAndUpdate(
            { _id: day._id, doctorId: userId },
            { ...day },
            { new: true }
        );

        if (!updatedScheduledDay) {
            res.status(404);
            throw new Error("Scheduled day not found");
        }

        console.log("Updated scheduled day: ", updatedScheduledDay);
    }

    res.status(200).json({
        success: true,
        message: "Updated scheduled days successfully"
    });
});

