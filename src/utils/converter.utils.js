const logger = require('../logHandler/logger');

const convertCelsiusToFahrenheit = (celsius, decimal = 0) => {
    if (isNaN(celsius) || isNaN(decimal)) {
        logger.error(`Please input numbers for celsius and decimal, ${celsius}, ${decimal}`);
        throw new Error("Please input numbers for celsius and decimal");
    }
    const result = (Number(celsius) * 9) / 5 + 32;
    return Number(result.toFixed(decimal));
}

const convertFahrenheitToCelsius = (fahrenheit, decimal = 0) => {
    if (isNaN(fahrenheit) || isNaN(decimal)) {
        logger.error(`Please input numbers for fahrenheit and decimal, ${fahrenheit}, ${decimal}`);
        throw new Error("Please input numbers for fahrenheit and decimal");
    }
    const result = (Number(fahrenheit) - 32) * 5 / 9;
    return Number(result.toFixed(decimal));
}

const capitalizeFirstLetter = (string) => {
    if (typeof string !== 'string') {
        logger.error(`Please input string, ${string}`);
        throw new Error("Please input string");
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
    convertCelsiusToFahrenheit,
    convertFahrenheitToCelsius,
    capitalizeFirstLetter
}