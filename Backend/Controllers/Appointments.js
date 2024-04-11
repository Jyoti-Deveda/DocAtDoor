const expressAsyncHandler = require("express-async-handler");
const User = require("../Models/User");
const ScheduledDays = require("../Models/ScheduledDays");
const DoctorsProfile = require("../Models/DoctorsProfile");
const Appointment = require("../Models/Appointment");


// @desc - Book an appointment
// @route - POST /api/user/book-appointment

exports.bookAppointment = expressAsyncHandler(async (req, res) => {
    const { userId } = req.user;
    const { doctorId, diseases, scheduledDay, timeslot } = req.body;

    const userDetails = await User.findById(userId).populate('patientsAppointments');
    if (!userDetails) {
        res.status(404);
        throw new Error("User not found");
    }

    if (!doctorId || !diseases || diseases.length < 1 || !scheduledDay || !timeslot) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const doctorDetails = await User.findById(doctorId).populate('doctorsAppointments');
    if (!doctorDetails) {
        res.status(404);
        throw new Error("Doctor not found");
    }

    const scheduledDayDetails = await ScheduledDays.findOne({ _id: scheduledDay, doctorId: doctorId });
    if (!scheduledDayDetails) {
        res.status(404);
        throw new Error("Scheduled day not found");
    }

    // Find the corresponding time slot
    const slotIndex = scheduledDayDetails.slots.findIndex(slot =>
        slot.start_time === timeslot.start_time && slot.end_time === timeslot.end_time
    );

    if (slotIndex === -1) {
        res.status(404);
        throw new Error("Time slot not found");
    }

    //check if day is already booked or slot is not free
    if (scheduledDayDetails.booked || !scheduledDayDetails.slots[slotIndex].isSlotFree) {
        res.status(400);
        throw new Error("Slot is not free");
    }

    //check if an appointment is already booked on that slot
    const appointmentDetails = await Appointment.findOne({
    patient: userDetails._id,
    doctor: doctorId,
    scheduledDay: scheduledDayDetails._id,
    'timeslot.start_time': timeslot?.start_time,
    'timeslot.end_time': timeslot?.end_time,
});

    console.log("Appointment details: ", appointmentDetails);

    if(appointmentDetails){
        res.status(400);
        throw new Error("Appointment already booked on that slot");
    }
    

    // Increase appointmentsBooked by 1 and mark slot as not free if needed
    scheduledDayDetails.slots[slotIndex].appointmentsBooked += 1;
    if (scheduledDayDetails.slots[slotIndex].appointmentsBooked === scheduledDayDetails.slots[slotIndex].avg_no_of_patients) {
        scheduledDayDetails.slots[slotIndex].isSlotFree = false;
    }

    // Check if all slots are booked
    const allSlotsBooked = scheduledDayDetails.slots.every(slot => !slot.isSlotFree);
    if (allSlotsBooked) {
        scheduledDayDetails.booked = true;
    }

    await scheduledDayDetails.save();

    // Create appointment
    const newAppointment = await Appointment.create({
        diseaseNames: diseases,
        doctor: doctorId,
        patient: userDetails._id,
        scheduledDay: scheduledDayDetails._id,
        timeslot: scheduledDayDetails.slots[slotIndex],
    });

    //add appointment to the patients appointments array
    userDetails.patientsAppointments.push(newAppointment._id);
    await userDetails.save();

    //add appointment to the doctors appointments array
    doctorDetails.doctorsAppointments.push(newAppointment._id);
    await doctorDetails.save();

    res.status(201).json({ message: "Appointment booked successfully", appointment: newAppointment });
});
