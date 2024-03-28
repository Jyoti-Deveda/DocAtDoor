const asyncHandler = require("express-async-handler");

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

