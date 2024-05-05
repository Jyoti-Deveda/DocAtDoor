const expressAsyncHandler = require("express-async-handler");
const DoctorsProfile = require("../Models/DoctorsProfile");
const ScheduledDays = require("../Models/ScheduledDays");

exports.fetchScheduledDays = expressAsyncHandler(async (req, res) => {
  const { userId } = req.user;

  const doctorDetails = await DoctorsProfile.findOne({
    doctorId: userId,
  }).populate("workingDays");
  
  // console.log("Doctor details: ", doctorDetails);

  //check for scheduled days
  let scheduledDays = await ScheduledDays.find({
    doctorId: userId,
    date: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
  }).sort({ date: 1 });

  // console.log("Scheduled days: ", scheduledDays);
  // console.log("Scheduled days length: ", scheduledDays.length);

  //if 7 days data from today to next seven days is present simply return it
  if (scheduledDays && scheduledDays.length >= 7) {
    scheduledDays = scheduledDays.slice(0, 7);
    // console.log("Scheduled days length after slicing: ", scheduledDays.length);

    return res.status(200).json({
      success: true,
      scheduledDays,
      message: "Scheduled days fetched successfully",
    });
  }

  var generatedDates = [];
  //since dates from the day user visits the page are fetched, generate dates for rest of the days

  if (!scheduledDays || scheduledDays?.length === 0) {
    generatedDates = generateScheduledDays(Date.now(), 7);
  } else {
    let len = scheduledDays.length;
    const remainingDays = 7 - len;

    //this many dates need to be generated
    if (remainingDays != 0) {
      const lastAvailableDate = scheduledDays[len - 1].date;
      // console.log("Last available date: ", lastAvailableDate);
      generatedDates = generateScheduledDays(lastAvailableDate, remainingDays);
    }
  }
  // console.log("Generated dates: ", generatedDates);

  const uniqueGeneratedDates = generatedDates.filter(
    (date) =>
      !scheduledDays.some((day) => day.date.getTime() === date.getTime())
  );

  // console.log("Unique dates: ", uniqueGeneratedDates);

  //for the generated dates, create ScheduledDay document and save to db
  await Promise.all(
    uniqueGeneratedDates.map(async (date) => {
      const newDate = await ScheduledDays.create({
        doctorId: userId,
        date: date,
      });

      scheduledDays.push(newDate);
    })
  );

  // console.log("Final scheduled days: ", scheduledDays);
  // console.log("Final scheduled days length: ", scheduledDays.length);

  doctorDetails.workingDays = scheduledDays;
  await doctorDetails.save();

  res.status(200).json({
    success: true,
    scheduledDays,
    message: "Scheduled days fetched successfully",
  });
});

const generateScheduledDays = (startDate, noOfDays) => {
  const scheduledDays = [];
  const currentDate = new Date(startDate);

  for (let i = 0; i < noOfDays; i++) {
    currentDate.setDate(currentDate.getDate() + 1);
    scheduledDays.push(new Date(currentDate));
  }

  return scheduledDays;
};

exports.setScheduledDays = expressAsyncHandler(async (req, res) => {
  const { userId } = req.user;
  const scheduledDays = req.body;

  //scheduled days is an object of objects
  if (!scheduledDays || Object.keys(scheduledDays).length === 0) {
    res.status(400);
    throw new Error("Scheduled day data is missing");
  }

  await Promise.all(
    Object.values(scheduledDays).map(async (day) => {
      if (!day.date || !day._id) {
        res.status(400);
        throw new Error(
          "Date and doctor are required in each scheduled day data"
        );
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

      // console.log("Updated scheduled day: ", updatedScheduledDay);
    })
  );

  res.status(200).json({
    success: true,
    message: "Updated scheduled days successfully",
  });
});

const deleteScheduledDays = async () => {
  try {
    const deletedDays = await ScheduledDays.deleteMany({});
    console.log("Deleted days: ", deletedDays);
    return deletedDays;
  } catch (err) {
    console.log("Error in deleting scheduled days: ", err);
    throw err;
  }
};
