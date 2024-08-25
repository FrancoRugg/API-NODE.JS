function errorLog(err, req, res, next) {
    console.log('errorLog: ');
    console.error(err);
    next(err);

}
function errorHandler(err, req, res, next) {
    console.log('errorHandler: ');
    const statusCode = err.status || 500;
    res.status(statusCode).send({
        message: statusCode == 500 ? 'Error in the Server' : err.message,
        err: true
        // stack: err.stack
    });
}

module.exports = { errorLog, errorHandler };