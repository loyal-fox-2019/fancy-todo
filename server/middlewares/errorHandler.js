`use strict`

module.exports = {
    errorHandler: function (error, req, res, next) {
        // console.log(JSON.stringify(error, null, 2));
        console.log(error);

        let statusCode;
        let messageError = [];

        switch (error.name) {
            case "ValidationError":
                    // console.log(error.message);
                statusCode = 400;
                for (const key in error.errors) {
                    messageError.push(error.errors[key].message);
                    // console.log(key);
                };
                break;

            case "JsonWebTokenError":
                statusCode = 403;
                messageError = error.message;
                break;

            case 'MongoError':
                statusCode = 400;
                for (const key in error.keyValue) {
                    if (key == "email") {
                        messageError = "Email terpakai";
                    } else if (key == "name") {
                        messageError = "Nama terpakai";
                    }
                }
                break;
            default:
                statusCode = error.status || 500;
                messageError = error.msg || "Internal Server Error";
                break;
        }

        // console.log(statusCode, messageError);

        res.status(statusCode).json({
            message: messageError
        })
    }
}