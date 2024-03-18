const asyncHandler = require("express-async-handler");
const DoctorsProfile = require("../Models/DoctorsProfile");
const Disease = require("../Models/Disease");
const user = require("../Models/user");

exports.createProfile = asyncHandler(async (req, res) => {

    const { userId } = req.user;

    console.log(req.body)

    const {
        personal_details,
        hospital_details,
        academic_details,
        verification_details,
        specialization,
        specializedDiseases
    } = req.body;

    const {
        first_name, last_name, email, bio, experience
    } = personal_details;

    const {
        name, city, state, postal_code, contact_info, appointment_fee
    } = hospital_details;

    const {
        reg_number, reg_year, state_medical_council
    } = verification_details;

    //1 - check if personal details are present
    if (!personal_details || !first_name || !last_name || !email || !bio || !experience) {
        res.status(404);
        throw new Error("Personal details are missing")
    }

    try {
        //upadte firstname and lastname
        const userDetails = await user.findByIdAndUpdate(
            userId,
            {
                "personalDetails.firstName": first_name,
                "personalDetails.last_name": last_name
            },
            { new: true }
        )
        console.log("Updated user details: ", userDetails);
    } catch (err) {
        console.log("Error in updating firstname lastname: ", err);
        res.status(400)
        throw new Error(err.message);
    }

    console.log("Checked personal details")

    //2 - check for hospital_details
    if (!hospital_details || !name || !city || !state || !postal_code || !contact_info || !experience || !appointment_fee) {
        res.status(404);
        throw new Error("Hospital details are missing")
    }
    console.log("Checked hospital details: ", hospital_details);


    //check for specialization and specialized diseases 
    if (!specialization || specialization.length <= 0) {
        res.status(404);
        throw new Error("Atleast one specialization is required");
    }

    if (!specializedDiseases || specializedDiseases.length <= 0) {
        res.status(404);
        throw new Error("Atleast one disease, the doctor is specialized at is required");
    }
    console.log("Checked specialization details")


    //for each disease a doctor is specialized in, create a disease document if it does not already exist and add doctor id to it
    const diseasesArr = await Promise.all(specializedDiseases.map(async (disease) => {

        const diseaseDetails = await Disease.findOne({ diseaseName: disease });

        let diseaseId = null;
        //if disease not already exists in db create new
        if (!diseaseDetails) {
            const newDisease = await Disease.create({
                diseaseName: disease,
                doctors: [userId]
            })
            diseaseId = newDisease._id;
        }
        //if disease exist but doctor is not added to disease add it
        else if (!diseaseDetails.doctors.includes(userId)) {
            const updatedDisease = await Disease.findOneAndUpdate(
                { diseaseName: disease },
                { $push: { doctors: userId } },
                { new: true }
            )
            diseaseId = updatedDisease._id;
        } else {
            diseaseId = diseaseDetails._id;
        }
        return diseaseId;
    }))
    console.log("Disease array: ", diseasesArr);

    //3 - check academic_details 
    if (academic_details && academic_details.length > 0) {

        academic_details.forEach((detail, index) => {
            if (!detail.university_name || !detail.course || !detail.certification) {
                res.status(404);
                throw new Error(`Academic details at index${index} is missing`)
            }
        });

    } else {
        res.status(404);
        throw new Error("Academic details are required")
    }
    console.log("Checked academic details")


    //check - verification details
    console.log("Registration number: ", reg_number)
    console.log("Registration year: ", reg_year)
    console.log("Registration state medical council: ", state_medical_council)
    console.log("Checked verification details: ", verification_details);

    if (!verification_details || !reg_number || !reg_year || !state_medical_council) {
        res.status(404);
        throw new Error("Verification details are missing");
    }

    const profileDetails = await DoctorsProfile.findOne({ doctorId: userId });

    let profile = {
        doctorId: userId,
        specialization: specialization,
        specializedDiseases: diseasesArr,
        bio: bio,
        experience: experience,
        educationalQualification: academic_details,
        verificationDetails: verification_details,
        hospitalDetails: hospital_details,
    };

    // if (profileDetails) {
    //     profile.specialization = profileDetails.specialization.concat(specialization);
    //     profile.specializedDiseases = profileDetails.specializedDiseases.concat(diseasesArr);
    // }

    if (profileDetails) {
        profile = await DoctorsProfile.findByIdAndUpdate(profileDetails._id, profile, { new: true });
        console.log("Doctor's updated profile: ", profile);
    } else {
        profile = await DoctorsProfile.create(profile);
    }

    // Return the created or updated profile
    res.status(200).json({
        success: true,
        profile,
        message: "Doctor's profile created successfully"
    })
});

