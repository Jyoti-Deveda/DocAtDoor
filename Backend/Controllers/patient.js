const asyncHandler = require("express-async-handler");
const user = require("../models/user");

// @desc  Get user (patient) details
// @route GET /api/patient/details
// @access Private
exports.get_user_details = asyncHandler(async (req, res) => {

    const { userId } = req?.user;

    const userDetails = await user.findById(userId);

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

    const updatedUserDetails = await user.findByIdAndUpdate(
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