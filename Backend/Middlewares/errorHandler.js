const { constants } = require('../constants');

//middleware to tackle all the errors to be sent to client
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.status(400).json({ success: false, error: err.message, stackTrace: err.stack });
            break;
        case constants.NOT_FOUND:
            res.json({ success: false, title: "Not Found", error: err.message, stackTrace: err.stack })
            break;
        case constants.UNAUTHORIZED:
            res.json({ success: false, title: "Un Authorized", error: err.message, stackTrace: err.stack })
            break;
        case constants.FORBIDDEN:
            res.json({ success: false, title: "Forbidden", error: err.message, stackTrace: err.stack })
            break;
        case constants.SERVER_ERROR:
            res.json({ success: false, title: "Something went wrong", error: err.message, stackTrace: err.stack })
            break;
        default:
            console.log("Status code: ", statusCode);
            res.json({success: true});
            break;

    }
}
module.exports = errorHandler;