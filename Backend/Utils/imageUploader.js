const expressAsyncHandler = require('express-async-handler');
const multer = require('multer');
const User = require('../Models/user');

const upload = multer({dest: 'uploads/'});

const router = require('express').Router();

router.post('/upload-image', upload.single('profileImage'), expressAsyncHandler(async (req, res) => {

    console.log(req.file)
    const { userId } = req.body;

    await User.findByIdAndUpdate(userId, {
        image: req.file.pathname
    })

}))

module.exports = router;