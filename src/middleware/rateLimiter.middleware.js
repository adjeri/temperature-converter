const rateLimit = require('express-rate-limit');
const dotenv = require("dotenv");

dotenv.config();

const rateLimiter = rateLimit({
    windowMs: parseInt(process.env.WINDOWS_MS) || 0,
    max: parseInt(process.env.MAX_REQUESTS_LIMIT) || 0,
    standardHeaders: process.env.STANDARD_HEADERS,
    legacyHeaders: process.env.LEGACY_HEADERS,
})

module.exports = rateLimiter