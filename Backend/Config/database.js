const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log("DB connected successfully"))
        .catch((err) => {
            console.log("Issue in DB connection");
            console.error(err);
            process.exit();
        })
}

module.exports = dbConnect;