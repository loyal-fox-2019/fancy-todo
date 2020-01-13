module.exports = (error, req, res, next) => {
    console.log(error);
    console.log(JSON.stringify(error, null, 2));
    let statusCode = null,
        messageError = null
    switch (error.name) {
        case value:
            //do something
            break;

        default:
            statusCode = error.status || 500
            messageError = error.message || 'Internal Server Error'
            break;
    }
    res.status(statusCode).JSON({
        message: messageError
    })
}