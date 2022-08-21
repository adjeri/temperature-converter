const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const HttpException = require("./utils/HttpException.utils");
const errorMiddleware = require("./middleware/error.middleware");
const temperatureRouter = require("./routes/temperature.route");
const rateLimiter = require("./middleware/rateLimiter.middleware");
const logger = require('./logHandler/logger');
const httpLogger = require('./logHandler/httpLogger');

// Init express
const server = express();

// Init environment
dotenv.config();

// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
server.use(express.json());

// enabling cors for all requests by using cors middleware
server.use(cors());

// Enable pre-flight
server.options("*", cors());

// Apply the rate limiting middleware to all requests
server.use(rateLimiter)

// logs all requests to the console
server.use(httpLogger);

const port = Number(process.env.PORT || 3000);

server.use("/api/convert-temperature", temperatureRouter);

//404 error
server.all("*", (req, res, next) => {
    const err = new HttpException(404, "The requested resource could not be found");
    next(err);
});

// Error middleware
server.use(errorMiddleware);

// starting the server
server.listen(port, () => logger.info(`🚀 Server running on port ${port}!`));

module.exports = server;