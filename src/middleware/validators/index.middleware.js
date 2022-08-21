const { header, query } = require("express-validator");

exports.headerValidator = [
    header("Content-Type")
        .exists()
        // .bail()
        .withMessage("Content-Type header is required")
        .trim()
        .equals("application/json")
        // .bail()
        .withMessage("Content-Type header must be application/json"),
];

const availableUnits = ['celsius', 'fahrenheit'];

exports.queryValidator = [
    query("from")
        .exists()
        .withMessage("from is required")
        .trim()
        .isIn(availableUnits)
        .withMessage("from must be one of the following: " + availableUnits.join(", ")),
    query("to")
        .exists()
        .withMessage("to is required")
        .trim()
        .isIn(availableUnits)
        .withMessage("to must be one of the following: " + availableUnits.join(", "))
        .custom((value, { req }) => {
            if (value === req.query.from) {
                throw new Error(`to must be different from ${req.query.from}`);
            }
            return true;
        }),
    query("value")
        .exists()
        .withMessage("value is required")
        .trim()
        .isNumeric()
        .withMessage("value must be a number"),
    query("decimal")
        .optional()
        .trim()
        .isInt()
        .withMessage("decimal must be an integer")
        .custom((value, { req }) => {
            if (value < 0 || value > 100) {
                throw new Error('decimal must be between 0 and 100');
            }
            return true;
        }),
];