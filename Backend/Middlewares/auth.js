const jwt = require("jsonwebtoken");
require("dotenv").config();
const asyncHandler = require("express-async-handler");
const { userRoles } = require("../constants");
const { logout } = require("../Controllers/auth");

//auth
exports.auth = asyncHandler(async (req, res, next) => {
  //extract token
  const token =
    req.cookies.authToken ||
    req.body.authToken ||
    req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.clearCookie("authToken", { path: "/" });
    res.status(401);
    throw new Error("Token is missing... trying logging in again");
  }

  try {
    // Verify token
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    // Proceed to next middleware
    next();
  } catch (error) {
    // Handle token verification error
    res.clearCookie("authToken", { path: "/" });
    throw new Error("Token is invalid or expired");
  }
});

exports.isUserVerified = asyncHandler(async (req, res, next) => {
  if (!req.user.verified) {
    res.status(401);
    throw new Error("User is not verified");
  } else {
    next();
  }
});

exports.isDoctor = asyncHandler(async (req, res, next) => {
  // console.log("User type: ", req.user.userType);

  if (req.user.userType !== userRoles.DOCTOR) {
    res.status(401);
    throw new Error("User is not verified asa doctor");
  } else {
    next();
  }
});

exports.isPatient = asyncHandler(async (req, res, next) => {
  if (req.user.userType !== userRoles.PATIENT) {
    res.status(401);
    throw new Error("User is not verified as a patient");
  } else {
    next();
  }
});
