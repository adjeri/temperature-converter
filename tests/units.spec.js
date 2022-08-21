const { convertCelsiusToFahrenheit, convertFahrenheitToCelsius, capitalizeFirstLetter } = require('../src/utils/converter.utils');

describe('conversion', () => {
    test('test convert 32 celsius to fahrenheit is 90', () => {
        const value = 32;
        const result = convertCelsiusToFahrenheit(value);
        expect(result).toEqual(90);
    });

    test('test convert 32 celsius to fahrenheit is 89.6, 1 decimal', () => {
        const value = 32;
        const result = convertCelsiusToFahrenheit(value, 1);
        expect(result).toEqual(89.6);
    });

    test('test convert celsius to fahrenheit with no value', () => {
        expect(() => convertCelsiusToFahrenheit()).toThrow('Please input numbers for celsius and decimal');
    });

    /////////////
    test('test convert 32 fahrenheit to celsius is 0', () => {
        const value = 32;
        const result = convertFahrenheitToCelsius(value);
        expect(result).toEqual(0);
    });

    test('test convert 38 fahrenheit to celsius is 3.3, 1 decimal', () => {
        const value = 38;
        const result = convertFahrenheitToCelsius(value, 1);
        expect(result).toEqual(3.3);
    });

    test('test convert fahrenheit to celsius with no value', () => {
        expect(() => convertFahrenheitToCelsius()).toThrow('Please input numbers for fahrenheit and decimal');
    });

    /////////////
    test('test capitalize first letter of string is Hello', () => {
        const value = 'hello';
        const result = capitalizeFirstLetter(value);
        expect(result).toEqual('Hello');
    });
    test('test capitalize first letter of string throws an error when the input is not a string', () => {
        expect(() => capitalizeFirstLetter([])).toThrow('Please input string');
    });
});