const logger = require('../logHandler/logger');

const errorMiddleware = (error, req, res, next) => {
    let { status = 500, message, data } = error;

    logger.error(`[Error] ${error}`);

    // If status code is 500 - change the message to Internal server error
    message = status === 500 || !message ? "Internal server error" : message;

    error = {
        type: "error",
        status,
        message,
        ...(data) && data,
    };

    res.status(status).send(error);
}

module.exports = errorMiddleware;

/* output
{
    type: 'error',
    status: 404,
    message: 'Not Found'
    data: {...} // optional
}
*/