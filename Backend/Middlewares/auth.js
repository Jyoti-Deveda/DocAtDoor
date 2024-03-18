const jwt = require('jsonwebtoken');
require('dotenv').config();
const asyncHandler = require('express-async-handler');
const { userRoles } = require('../constants');

//auth
exports.auth = async (req, res, next) => {
    try {
        //extract token
        console.log("Before token verification")
        // console.log("req ", req);
        const token = req.cookies.authToken ||
            req.body.authToken
        // || req.header("Authorization").replace("Bearer ", "");

        // console.log("Token in middleware")
        // console.log("req.cookies.authToken: ", req.cookies.authToken);
        // console.log("req.body.authToken: ", req.body.authToken);
        // console.log(`req.header("Authorization").replace("Bearer ", ""): `, req.header("Authorization").replace("Bearer ", ""));

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            })
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("decode ", decode);
            req.user = decode;
            // console.log("Verified token")

        } catch (err) {
            return res.status(401).json({
                success: false,
                message: 'Token is invalid',
                error: err.message,
            })
        }
        next();
    } catch (err) {
        console.log("err.msg in auth middleware ", err.message);
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "could not verify token"
        })
    }
}

exports.isUserVerified = asyncHandler(async (req, res, next) => {

    if (!req.user.verified) {
        res.status(401)
        throw new Error("User is not verified")
    }
    else {
        next();
    }
})

exports.isDoctor = asyncHandler(async (req, res, next) => {

    console.log(req.user.userType)

    if (req.user.userType !== userRoles.DOCTOR) {
        res.status(401)
        throw new Error("User is not verified asa doctor")
    } else {
        next();
    }

})

exports.isPatient = asyncHandler(async (req, res, next) => {

    if (req.user.userType !== userRoles.PATIENT) {
        res.status(401)
        throw new Error("User is not verified asa doctor")
    }
    else {
        next();
    }

})