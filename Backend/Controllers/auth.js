const user = require("../Models/user");
const bcrypt = require('bcrypt')


//registration 
const signup = async (req, res) => {
    try{
        const { firstname, lastname, email, password, confirmpass } = req.body;

        //check if user already exists
        const userExists = await user.findOne(email);

        if(userExists){
            return res.status(400).json({
                success: false,
                message: "User is already registered"
            })
        }

        //

    }catch(err){

    }
}



//login


