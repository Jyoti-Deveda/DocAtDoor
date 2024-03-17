const user = require("../Models/user");
const bcrypt = require('bcrypt')
// use async handler for better error handeling 
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const mailSender = require("../Utils/mailSender");


// @desc register user
// @route POST /api/users/register
// @access public
// use asynchandler for better error handeling 
exports.userRegister = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, password, confirmpass, role } = req.body;

    // data validations 
    if (!firstName || !lastName || !email || !password || !confirmpass || !role) {
        res.status(400);
        throw new Error("All Fields are mandatory");
    }
    if (password != confirmpass) {
        res.status(400);
        throw new Error("Both passwords should be same");
    }
    if (!/^[a-zA-Z\s]+$/.test(firstName)) {
        res.status(400);
        throw new Error("Name must contain only letters and spaces");
    }

    if (!/^[a-zA-Z\s]+$/.test(lastName)) {
        res.status(400);
        throw new Error("Name must contain only letters and spaces");
    }

    // Check email format
    if (!/\S+@\S+\.\S+/.test(email)) {
        res.status(400);
        throw new Error("Invalid email format");
    }

    // Check password format
    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{8,}/.test(password)) {
        res.status(400);
        throw new Error("Password must be at least 8 characters long, contain at least one digit, a special character, one lowercase and one uppercase letter");
    }

    //check if user already exists
    const userExists = await user.findOne({ "personalDetails.email": email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const imageUrl = `https://api.dicebear.com/7.x/shapes/svg?seed=${firstName}`

    // create new user 
    const newUser = await user.create({
        personalDetails: {
            email,
            firstName,
            lastName,
            password: hashedPassword
        },
        userType: role,
        image: imageUrl
    })


    if (newUser) {
        next();
        // res.status(201).json({
        //     message: "User created successflly",
        //     user: {
        //         _id: newUser.id,
        //         email: newUser.personalDetails.email
        //     }
        // })
    }
    else {
        res.status(400);
        throw new Error("User data is not valid")
    }
})

//for email verification
exports.generateVerificationToken = asyncHandler(async (req, res, next) => {

    const { email } = req.body;

    if (!email) {
        res.status(400);
        throw new Error("Email to be verified not found")
    }

    //check if user entry is created in db
    const userDetails = await user.findOne({ "personalDetails.email": email })

    if (!userDetails) {
        res.status(400)
        throw new Error("User entry not found.. Please sign up")
    }

    //todo:check if user is verified already
    if (userDetails.verified) {
        res.status(403)
        throw new Error("User already verified.. You may login")
    }

    //User exists-> generate token 
    const token = crypto.randomBytes(20).toString('hex')
    payload = {
        email,
        token
    }

    const encryptedToken = jwt.sign(payload, process.env.JWT_SECRET)
    // console.log("encryptedToken: ", encryptedToken);

    //original token is saved to DB
    userDetails.verificationToken = token;
    userDetails.tokenExpiry = Date.now() + 3 * 24 * 60 * 60 * 1000;

    userDetails.save();
    // console.log("Updated user details: ", userDetails);

    const url = `http://localhost:5173/email-verified/${encryptedToken}`
    console.log("URL: ", url)

    const mailResponse = await mailSender(
        email,
        "Verification email",
        `To verify your email click on the link below <br> ${url}`
    )

    // console.log("Mail response: ", mailResponse)

    if (!mailResponse) {
        res.status(500)
        throw new Error("Email verification failed");
    }

    res.status(200).json({
        success: true,
        message: "Verification email sent successfully"
    })


})

//verify email
exports.verifyEmail = asyncHandler(async (req, res) => {

    const verificationToken = req.body.token;
    // console.log("Token fetched")

    try {
        const decryptToken = jwt.verify(verificationToken, process.env.JWT_SECRET);
        var { email, token } = decryptToken
    }
    catch (err) {
        res.status(400);
        throw new Error("Verification token invalid")
    }

    // console.log("Token decrypted")


    //check if user is already registered
    const userDetails = await user.findOne({ "personalDetails.email": email })
    // console.log("USER DETAILS: ", userDetails)

    if (!userDetails) {
        res.status(400);
        throw new Error("User entry not found.. Please signup")
    }

    // console.log("User exists")

    //check if email is already verified
    // console.log("USERDETAILS VERIFIED: ", userDetails.verified)
    if (userDetails.verified) {
        //if user is already verified
        res.status(200).json({
            success: true,
            message: "User verified success"
        })
    }

    // check token expiry 
    if (Date.now() > userDetails.tokenExpiry) {
        res.status(400);
        throw new Error("Token has expired... Request for new")
    }

    // console.log("Perform verification")
    if (userDetails.verificationToken !== token) {
        res.status(401);
        throw new Error("Invalid verification token");
    }

    userDetails.verified = true;
    userDetails.save();
    // console.log("Marked verified and return response")
    res.status(200).json({
        success: true,
        message: "User verified successfully"
    })

})

//login
exports.login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are required for login");
    }

    const userDetails = await user.findOne({ "personalDetails.email": email });
    // console.log("USER_DETAILS: ", userDetails);
    if (!userDetails) {
        res.status(400);
        throw new Error("User is not registered");
    }

    if (!userDetails.verified) {
        res.status(403);
        throw new Error("User is not verified");
    }
    // console.log("USer is verified")
    if (await bcrypt.compare(password, userDetails.personalDetails.password)) {
        const payload = {
            userId: userDetails._id,
            email: userDetails.personalDetails.email,
            verified: userDetails.verified,
            userType: userDetails.userType
        }

        const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "3d"
        })

        // console.log("Created token")
        userDetails.authToken = authToken;
        userDetails.personalDetails.password = undefined;
        
        const userData = {
            ...userDetails.personalDetails,
            userType: userDetails.userType,
            verified: userDetails.verified,
            authToken
        }


        const options = {
            expiresIn: 3 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false
        }

        return res
            .status(200)
            .cookie("authToken", authToken, options)
            .json({
                success: true,
                user: userData,
                authToken,
                message: "User login successfull"
            });
    }
    else {
        res.status(401);
        throw new Error("Incorrect password");
    }
})

exports.logout = asyncHandler((req, res) => {

    try{
        res.clearCookie('authToken', {path: '/'});
    }catch(err){
        throw new Error(err);    
    }

    res.json({
        success: true,
        message: "Logout successfully"
    })

})

exports.changePassword = asyncHandler(async (req, res) => {
	const { userId } = req.user;
	// Get user data from req.user
	const userDetails = await user.findById(userId);

	const { oldPassword, newPassword, confirmNewPassword } = req.body;

    if(!oldPassword || !newPassword || !confirmNewPassword){
        res.status(404);
        throw new Error("All fields are required")
    }

	// Validate old password
	const isPasswordMatch = await bcrypt.compare(
		oldPassword,
		userDetails.personalDetails.password
	);
	if (!isPasswordMatch) {
		res.status(401)
        throw new Error("The password is incorrect");
	}

	// Match new password and confirm new password
	if (newPassword !== confirmNewPassword) {
		res.status(400);
        throw new Error("The password and confirm password does not match");
	}

	// Update password
	const encryptedPassword = await bcrypt.hash(newPassword, 10);
	const updatedUserDetails = await user.findByIdAndUpdate(
		userId,
		{ "personalDetails.password": encryptedPassword },
		{ new: true }
	);

	// Send notification email
	try {
		const emailResponse = await mailSender(
            updatedUserDetails.personalDetails.email,
            "Password Updated",
            `Password updated successfully for ${updatedUserDetails.personalDetails.firstName} ${updatedUserDetails.personalDetails.lastName}`
        )
		console.log("Email sent successfully:", emailResponse.response);

	} catch (error) {
		console.error("Error occurred while sending email:", error);
		throw new Error(error.message);
	}

	// Return success response
	return res.status(200).json({
        success: true,
        message: "Password updated successfully" 
    });
})