const jwt = require('jsonwebtoken');
require('dotenv').config();

//auth
exports.auth = async (req, res, next) => {
    try{
        //extract token
        console.log("Before token verification")
        // console.log("req ", req);
        const token = req.cookies.token || 
                        req.body.token  || 
                        req.header("Authorization").replace("Bearer ", "");

       
        if(!token){
            return res.status(401).json({
                success: false,
                error: err.message,
                message: "Token is missing",
            })
        }
        
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("decode ", decode);
            req.user = decode;
            // console.log("Verified token")

        }catch(err){
            return res.status(401).json({
                success: false,
                message: 'Token is invalid',
                error: err.message,
            })
        }
        next();
    }catch(err){
        console.log("err.msg in auth middleware ", err.message);
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "could not verify token"
        })
    }
}