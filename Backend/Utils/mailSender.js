const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    try{
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            // auth obj represents the one who sends the mail 
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }    
        })
        let info = transporter.sendMail({
            from : 'StudyNotion || Jyoti Deveda',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}` 
        })
        // console.log(info);
        return info;
    }catch(err){
        console.log("ERROR IN CREATING MAIL TRANSPORTER: ", err.message);
    }
}

module.exports = mailSender;