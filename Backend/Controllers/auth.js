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
    // if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{8,}/.test(password)) {
    //     res.status(400);
    //     throw new Error("Password must be at least 8 characters long, contain at least one digit, one lowercase and one uppercase letter");
    // }

    //check if user already exists
    const userExists = await user.findOne({ "personalDetails.email": email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const imageUrl= `https://api.dicebear.com/7.x/shapes/svg?seed=${firstName}`

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
exports.generateVerificationToken = asyncHandler(async(req, res, next) => {

    const { email } = req.body;

    if(!email){
        res.status(400);
        throw new Error("Email to be verified not found")
    }

    //check if user entry is created in db
    const userDetails = await user.findOne({"personalDetails.email":email})

    if(!userDetails){
        res.status(400)
        throw new Error("User entry not found.. Please sign up")
    }

    //todo:check if user is verified already
    if(userDetails.verified){
        res.status(403)
        throw new Error("User already verified")
    }

    //User exists-> generate token 
    const token = crypto.randomBytes(20).toString('hex')

    userDetails.verificationToken = token;
    userDetails.tokenExpiry = Date.now() + 3*24*60*60*1000

    userDetails.save();
    console.log("Updated user details: ", userDetails);

    const url = `http://localhost:5173/email-verification/${token}`

    const mailResponse = await mailSender(
        email,
        "Verification email",
        `To verify your email click on the link below <br> ${url}`
    )

    console.log("Mail response: ", mailResponse)

    if(!mailResponse){
        res.status(500)
        throw new Error("Email verification failed");
    }

    res.status(200).json({
        success: true,
        message: "Verification email sent successfully"
    })
     
     
})

//verify email
exports.verifyEmail = asyncHandler(async(req, res) => {

    const {token, email} = req.body;

    //check if user is already registered
    const userDetails = await user.findOne({"personalDetails.email":email})

    if(!userDetails){
        res.status(400);
        throw new Error("User entry not found.. Please signup")
    }

    //check if email is already verified
    if(userDetails.verified){
        res.status(403)
        throw new Error("User already verified")
    }

    if(userDetails.verificationToken !== token){
        res.status(401);
        throw new Error("Invalid verification token");
    }

    userDetails.verified = true;
    res.status(200).json({
        success: true,
        message: "User verified success"
    })

})

//login


// module.exports = { userRegister }