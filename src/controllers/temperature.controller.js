const HttpException = require("../utils/HttpException.utils");
const { validationResult } = require("express-validator");
const { convertCelsiusToFahrenheit, convertFahrenheitToCelsius, capitalizeFirstLetter } = require("../utils/converter.utils");

/******************************************************************************
 *                              Temperature Controller
 ******************************************************************************/
class TemperatureController {
    getTemperature = (req, res, next) => {
        this.checkValidation(req);

        try {
            let from = req.query.from;
            let to = req.query.to;
            const value = Number(req.query.value);
            const decimal = Number(req.query.decimal) || 0;
            let result = '';
            let resultRaw = '';

            if (from === "celsius") {
                result = convertCelsiusToFahrenheit(value, decimal);
                resultRaw = `${result}°F`;
            } else {
                result = convertFahrenheitToCelsius(value, decimal);
                resultRaw = `${result}°C`;
            }

            res.status(200).send({
                from: capitalizeFirstLetter(from),
                to: capitalizeFirstLetter(to),
                decimal,
                value,
                result,
                resultRaw
            });
        }
        catch (err) {
            throw new HttpException(500);
        }
    };

    checkValidation = (req) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new HttpException(422, "Invalid input", errors);
        }
    };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new TemperatureController();