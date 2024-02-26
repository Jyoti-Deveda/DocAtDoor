const user = require("../Models/user");
const bcrypt = require('bcrypt')
// use async handler for better error handeling 
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')


// @desc register user
// @route POST /api/users/register
// @access public
// use asynchandler for better error handeling 
const userRegister = asyncHandler(async (req, res) => {
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
        throw new Error("Password must be at least 8 characters long, contain at least one digit, one lowercase and one uppercase letter");
    }

    //check if user already exists
    const userExists = await user.findOne({ "personalDetails.email": email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // create new user 
    const newUser = await user.create({
        personalDetails: {
            email,
            firstName,
            lastName,
            password: hashedPassword
        },
        userType: role
    })

    if (newUser) {
        res.status(201).json({
            message: "User creater successflly",
            user: {
                _id: newUser.id,
                email: newUser.personalDetails.email
            }
        })
    }
    else {
        res.status(400);
        throw new Error("User data is not valid")
    }
})



//login


module.exports = { userRegister }