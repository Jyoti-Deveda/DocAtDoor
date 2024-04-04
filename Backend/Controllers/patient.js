const asyncHandler = require("express-async-handler");
const Disease = require("../Models/Disease");
const User = require("../Models/User")

// @desc  Get user (patient) details
// @route GET /api/patient/details
// @access Private
exports.get_user_details = asyncHandler(async (req, res) => {

    const { userId } = req?.user;

    const userDetails = await User.findById(userId);

    if (!userDetails) {
        res.status(404);
        throw new Error("User not found");
    }

    const formatedDetails = {
        personal_details: {
            first_name: userDetails.personalDetails.firstName,
            last_name: userDetails.personalDetails.lastName,
            email: userDetails.personalDetails.email,
        },
    }

    res.status(200).json({
        success: true,
        userDetails: formatedDetails,
        message: "User details fetched successfully"
    });
});


// @desc  Set user (patient) details
// @route POST /api/patient/details
// @access Private
exports.set_user_details = asyncHandler(async (req, res) => {

    const { userId } = req?.user;

    const { first_name, last_name } = req.body;

    if (!first_name || !last_name) {
        res.status(400);
        throw new Error("All fields are required");
    }
    if (first_name.length < 2 || last_name.length < 2) {
        res.status(400);
        throw new Error("First name and Last name should be atleast 2 characters long");
    }

    const updatedUserDetails = await User.findByIdAndUpdate(
        userId,
        {
            $set: {
                "personalDetails.firstName": first_name,
                "personalDetails.lastName": last_name
            }
        },
        { new: true }
    );

    if (!updatedUserDetails) {
        res.status(404);
        throw new Error("User not found");
    }

    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
    })

});

// exports.getDoctorsOfDisease = asyncHandler(async ( req, res) => {

//     const diseases = req.diseases;

//     if(!diseases){
//         res.status(400);
//         throw new Error("Diseases are required")
//     }

//     var doctorsList = [];
//     for (const disease of diseases) {
        
//         const diseaseDetails = await Disease.findOne({ diseaseName:disease }).populate('doctors');

//         console.log("DIsease details: ", diseaseDetails)

//         if(diseaseDetails?.doctors){
//             doctorsList.push(diseaseDetails?.doctors)
//         }

//     }

//     res.status(200).json({
//         success: true,
//         doctorsList,
//         message: "Doctors fetched successfully"
//     })

// })


exports.getDoctorsOfDisease = asyncHandler(async (req, res) => {
    const diseases = req.diseases;

    if (!diseases) {
        res.status(400);
        throw new Error("Diseases are required");
    }

    // Map to store doctor details along with the count of diseases they cover
    const doctorMap = new Map();

    // Iterate through each disease
    for (const disease of diseases) {
        const diseaseDetails = await Disease.findOne({ diseaseName: disease }).populate('doctors');

        if (diseaseDetails?.doctors) {
            for (const doctor of diseaseDetails.doctors) {
                // Increment the count of diseases covered by the doctor
                if (doctorMap.has(doctor._id)) {
                    doctorMap.get(doctor._id).count++;
                } else {
                    doctorMap.set(doctor._id, { doctor, count: 1 });
                }
            }
        }
    }

    if(doctorMap.size === 0){
        res.status(200).json({
            success: true,
            doctorsList: [],
            message: "No doctors found"
        })
    }

    // Sort the doctors based on the count of diseases they cover
    const sortedDoctors = [...doctorMap.values()].sort((a, b) => b.count - a.count);

    // Extract doctor details from the sorted list
    const doctorsList = sortedDoctors.map(({ doctor }) => doctor);

    res.status(200).json({
        success: true,
        doctorsList,
        message: "Doctors fetched successfully"
    });
});

