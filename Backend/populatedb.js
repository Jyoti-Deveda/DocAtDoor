#! /usr/bin/env node

console.log(
    'This script populates some users, doctors, diseases and scheduled days to database.'
);
// mongodb://localhost:27017/test

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Disease = require("./Models/Disease");
const DoctorsProfile = require("./Models/DoctorsProfile");
const ScheduledDays = require("./Models/ScheduledDays");
const User = require("./Models/User");

let doctors = [];
let doctorProfile = [];
let diseases = [];
let workingDays = [[]];


//main function
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");

    await createDiseases();

    await createDoctoruser();

    await createDoctorProfiles();

    await addDoctorToDisease();

    await addProfilesToUser();

    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}



// create disease and save to db 
async function diseaseCreate(index, name) {
    const disease = new Disease({ diseaseName: name });
    await disease.save();
    diseases[index] = disease;
    console.log(`Added disease: ${name}`);
}
// create doctor user and 7 working days for each doctor and save to db 
async function doctorCreate(index, data) {
    const doctor = new User(data);
    await doctor.save();
    doctors[index] = doctor;
    console.log(`Added doctor: ${doctor.personalDetails.firstName}`);

    console.log("Adding working days for doctor", doctor._id);
    await Promise.all([
        workingDayCreate(index, getWorkingDay(0, doctor._id)),
        workingDayCreate(index, getWorkingDay(1, doctor._id)),
        workingDayCreate(index, getWorkingDay(2, doctor._id)),
        workingDayCreate(index, getWorkingDay(3, doctor._id)),
        workingDayCreate(index, getWorkingDay(4, doctor._id)),
        workingDayCreate(index, getWorkingDay(5, doctor._id)),
        workingDayCreate(index, getWorkingDay(6, doctor._id)),
    ])
    console.log("Working days added for doctor", doctor._id);
}
// create doc profile and save to db 
async function doctorProfileCreate(index, data) {
    const profile = new DoctorsProfile(data);
    await profile.save();
    doctorProfile[index] = profile;
    console.log(`Added doctor profile for: ${profile.doctorId}`);
}
// create working day scheduledDay and save to db 
async function workingDayCreate(index, data) {
    const workingDay = new ScheduledDays(data);
    await workingDay.save();

    if (!workingDays[index]) {
        workingDays[index] = [workingDay];
    } else {
        workingDays[index].push(workingDay);
    }
}
async function addDoctorToDisease() {
    console.log("Adding doctors to diseases")

    // iterate doctor profile > specialized diseases then find that disease and update the doctors array in that disease 
    await Promise.all(doctorProfile.map(async (profile) =>
        await Promise.all(profile.specializedDiseases.map((diseaseId) =>
            Disease.findByIdAndUpdate(diseaseId,
                { $push: { doctors: profile.doctorId } },
                { new: true }
            )
        ))
    ));
    console.log("Doctors added to diseases doctors")
}

async function addProfileToDoctorUser(data) {
    await User.findByIdAndUpdate(data.doctorId, { doctorsProfile: data._id }, { new: true });
    console.log("Profile added to doctor user");
}

// create a number of diseasess 
async function createDiseases() {
    console.log("Adding diseases")
    await Promise.all(allDiseases.map((disease, index) => diseaseCreate(index, disease.label)))
}
// create a number of doctors 
async function createDoctoruser() {
    console.log("Adding doctors")
    await Promise.all(allDoctors.map((doctor, index) => doctorCreate(index, doctor)))
}
// create a number of doctor profiles
async function createDoctorProfiles() {
    console.log("Adding doctor profiles");
    await Promise.all(doctors.map((doctor, index) => doctorProfileCreate(index, getProfile(index, doctor._id))));
}
async function addProfilesToUser() {
    console.log("Adding doctor profile to user")
    await Promise.all(doctorProfile.map((profile) => addProfileToDoctorUser(profile)));
}

// set data in object and return it accordinglt 
function getProfile(index, docId) {
    let profile = dummyProfile;
    profile.doctorId = docId;
    profile.workingDays = workingDays[index]
    profile.specializedDiseases = diseases.sort(() => 0.5 - Math.random()).slice(0, 5).map(disease => disease._id);
    return profile;
}
function getWorkingDay(index, docId) {
    let workingDay = scheduledDay;
    workingDay.date = new Date(Date.now() + 60 * 60 * 24 * 1000 * index)
    workingDay.doctorId = docId;
    return workingDay;
}


// generate random user data for doctors
const names = ["John", "Jane", "James", "Jill", "Jack", "Julia", "Jerry", "Jasmine", "Jacob", "Jenny", "Jeff", "Joyce", "Joe", "Joan", "Jesse", "June", "Jonah", "Josie", "Jordan", "Jocelyn", "Jared", "Janet", "Jay", "Jean", "Joel", "Jade", "Javier", "Jenna", "Josiah", "Joy", "Jaxon", "Jada", "Jace"];
const lastNames = ["Doe", "Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson", "Martinez", "Anderson", "Taylor", "Thomas", "Hernandez", "Moore", "Martin", "Jackson", "Thompson", "White", "Lopez", "Lee", "Gonzalez", "Harris", "Clark", "Lewis", "Robinson", "Walker", "Perez", "Hall", "Young", "Allen"];
let allDoctors = [];
for (let i = 0; i < names.length; i++) {
    allDoctors.push({
        personalDetails: {
            firstName: names[i],
            lastName: lastNames[i],
            email: `${names[i].toLowerCase()}.${lastNames[i].toLowerCase()}@example.com`,
            password: `${names[i].toLowerCase()}@123`
        },
        image: `https://api.dicebear.com/7.x/shapes/svg?seed=${names[i]}`,
        userType: "Doctor",
        verified: true,
    });
}

const dummyProfile = {
    doctorId: "60d721bcb69a8839991c1c25", // This should be a valid ObjectId
    specialization: ["Cardiology", "Neurology"],
    specializedDiseases: ["60d721bcb69a8839991c1c26", "60d721bcb69a8839991c1c27"], // These should be valid ObjectIds
    bio: "Dr. John Doe is a specialist in Cardiology and Neurology with over 5 years of experience.",
    experience: "1to5Years",
    verified: true,
    educationalQualification: [
        {
            university_name: "Harvard University",
            course: "Medicine",
            certification: {
                url: "https://example.com/certification.pdf",
                name: "Certification in Medicine"
            }
        }
    ],
    verificationDetails: {
        reg_number: "123456",
        reg_year: new Date(2016, 0, 1),
        state_medical_council: "California Medical Council"
    },
    hospitalDetails: {
        name: "General Hospital",
        city: "Los Angeles",
        state: "California",
        postal_code: 90001,
        contact_info: 1234567890,
        appointment_fee: 100
    },
    workingDays: []
}

const scheduledDay = {
    date: new Date(2022, 0, 1),
    isHoliday: false,
    slots: [
        {
            start_time: "09:00",
            end_time: "12:00",
            avg_no_of_patients: 20,
            appointmentsBooked: 0,
            isSlotFree: true
        },
        {
            start_time: "02:00",
            end_time: "05:00",
            avg_no_of_patients: 20,
            appointmentsBooked: 0,
            isSlotFree: true
        }
    ],
    doctorId: "60d721bcb69a8839991c1c25",
    booked: false
}


let allDiseases = [
    { "value": "fungal_infection", "label": "Fungal infection" },
    { "value": "allergy", "label": "Allergy" },
    { "value": "gerd", "label": "GERD" },
    { "value": "chronic_cholestasis", "label": "Chronic cholestasis" },
    { "value": "drug_reaction", "label": "Drug Reaction" },
    { "value": "peptic_ulcer_disease", "label": "Peptic ulcer disease" },
    { "value": "aids", "label": "AIDS" },
    { "value": "diabetes", "label": "Diabetes" },
    { "value": "gastroenteritis", "label": "Gastroenteritis" },
    { "value": "bronchial_asthma", "label": "Bronchial Asthma" },
    { "value": "hypertension", "label": "Hypertension" },
    { "value": "migraine", "label": "Migraine" },
    { "value": "cervical_spondylosis", "label": "Cervical spondylosis" },
    { "value": "paralysis_brain_hemorrhage", "label": "Paralysis (brain hemorrhage)" },
    { "value": "jaundice", "label": "Jaundice" },
    { "value": "malaria", "label": "Malaria" },
    { "value": "chicken_pox", "label": "Chicken pox" },
    { "value": "dengue", "label": "Dengue" },
    { "value": "typhoid", "label": "Typhoid" },
    { "value": "hepatitis_a", "label": "Hepatitis A" },
    { "value": "hepatitis_b", "label": "Hepatitis B" },
    { "value": "hepatitis_c", "label": "Hepatitis C" },
    { "value": "hepatitis_d", "label": "Hepatitis D" },
    { "value": "hepatitis_e", "label": "Hepatitis E" },
    { "value": "alcoholic_hepatitis", "label": "Alcoholic hepatitis" },
    { "value": "tuberculosis", "label": "Tuberculosis" },
    { "value": "common_cold", "label": "Common Cold" },
    { "value": "pneumonia", "label": "Pneumonia" },
    { "value": "dimorphic_hemmorhoids_piles", "label": "Dimorphic hemmorhoids(piles)" },
    { "value": "heart_attack", "label": "Heart attack" },
    { "value": "varicose_veins", "label": "Varicose veins" },
    { "value": "hypothyroidism", "label": "Hypothyroidism" },
    { "value": "hyperthyroidism", "label": "Hyperthyroidism" }
]