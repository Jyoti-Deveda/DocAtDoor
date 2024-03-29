const asyncHandler = require("express-async-handler");
const DoctorsProfile = require("../Models/DoctorsProfile");
const Disease = require("../Models/Disease");
const User = require("../Models/User");

exports.createProfile = asyncHandler(async (req, res) => {

    const { userId } = req.user;

    // console.log(req.body)

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

    //validations
    //1 - check if personal details are present
    if (!personal_details || !first_name || !last_name || !email || !bio || !experience) {
        res.status(404);
        throw new Error("Personal details are missing")
    }
    console.log("Checked personal details")

    //2 - check for hospital_details
    if (!hospital_details || !name || !city || !state || !postal_code || !contact_info || !experience || !appointment_fee) {
        res.status(404);
        throw new Error("Hospital details are missing")
    }
    console.log("Checked hospital details: ");


    //3 - check for specialization and specialized diseases 
    if (!specialization || specialization.length <= 0) {
        res.status(404);
        throw new Error("Atleast one specialization is required");
    }

    if (!specializedDiseases || specializedDiseases.length <= 0) {
        res.status(404);
        throw new Error("Atleast one disease, the doctor is specialized at is required");
    }
    console.log("Checked specialization details")

    //4 - check verification details
    // console.log("Registration number: ", reg_number)
    // console.log("Registration year: ", reg_year)
    // console.log("Registration state medical council: ", state_medical_council)

    if (!verification_details || !reg_number || !reg_year || !state_medical_council) {
        res.status(404);
        throw new Error("Verification details are missing");
    }
    console.log("Checked verification details: ");

    //5 - check academic_details 
    if (academic_details && academic_details.length > 0) {

        academic_details.forEach((detail, index) => {
            if (!detail.university_name || !detail.course) {
                res.status(404);
                throw new Error(`Academic details at index ${index} is missing`)
            }
        });

    } else {
        res.status(404);
        throw new Error("Academic details are required")
    }
    console.log("Checked academic details")
    // console.log("req.files: ", req.files);

    //check for image
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400);
        throw new Error("Certification is missing")
    }

    const certificate = req.files.certification;
    console.log("certificate image: ", certificate);

    if (!certificate) {
        res.status(400);
        throw new Error("certificate image is required");
    }

    const fileType = certificate.name.split('.').pop();
    console.log("FILE TYPE: ", fileType);
    //checking if file type is supported
    if (!supportedFiletypes.includes(fileType)) {
        res.status(400);
        throw new Error("File type is not supported. Type should be png, jpg, jpeg or pdf");
    }

    const image = await uploadImageToCloudinary(certificate, process.env.FOLDER_NAME, 1000, 1000);
    console.log("Uploaded image URL: ", image);

    if (!image) {
        res.status(400);
        throw new Error("Error in uploading image")
    }

    //updations
    //1 - update firstname and lastname
    try {
        //upadte firstname and lastname and image
        const userDetails = await User.findByIdAndUpdate(
            userId,
            {
                "personalDetails.firstName": first_name,
                "personalDetails.last_name": last_name,
                image: image?.secure_url
            },
            { new: true }
        )
        console.log("Updated user details: ", userDetails);
    } catch (err) {
        console.log("Error in updating firstname lastname: ", err);
        res.status(400)
        throw new Error(err.message);
    }


    //2 - for each disease a doctor is specialized in, 
    //create a disease document if it does not already exist and add doctorId to it
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
    // console.log("Disease array: ", diseasesArr);

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

    if (profileDetails) {
        profile = await DoctorsProfile.findByIdAndUpdate(
            profileDetails._id,
            profile,
            { new: true }
        );
        // console.log("Doctor's updated profile: ", profile);
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


//get invidual doctor details for general settings
exports.getDoctorDetails = asyncHandler(async (req, res) => {

    const { userId } = req.user;

    //for firstname and lastname
    const userDetails = await User.findById(userId);

    if (!userDetails) {
        res.status(400);
        throw new Error("User not found")
    }

    //for rest of the doctors details
    const doctorDetails = await DoctorsProfile.findOne({ doctorId: userId })
        .populate('specializedDiseases')
        .exec();

    if (!doctorDetails) {
        res.status(400);
        throw new Error("Doctor not found")
    }

    // console.log("Doctor details: ", doctorDetails);

    //creating an array of disease names
    const diseasesNames = await Promise.all(doctorDetails?.specializedDiseases?.map(disease => {
        return disease.diseaseName;
    }))

    //format date as "YYYY-MM-DD"
    const reg_year = formatDate(doctorDetails.verificationDetails.reg_year)
    // console.log("doctorDetails.verificationDetails.reg_year: ", reg_year)

    const doctor = {
        personal_details: {
            first_name: userDetails.personalDetails.firstName,
            last_name: userDetails.personalDetails.lastName,
            email: userDetails.personalDetails.email,
            bio: doctorDetails.bio,
            experience: doctorDetails.experience
        },
        hospital_details: doctorDetails.hospitalDetails,
        academic_details: doctorDetails.educationalQualification,
        verification_details: {
            reg_number: doctorDetails.verificationDetails.reg_number,
            reg_year,
            state_medical_council: doctorDetails.verificationDetails.state_medical_council,
        },
        specialization: doctorDetails.specialization,
        specializedDiseases: diseasesNames
    }

    res.status(200).json({
        success: true,
        doctor,
        message: "Doctor's details fetched successfully"
    })

})

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
    let day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed

    return `${year}-${month}-${day}`;
}

