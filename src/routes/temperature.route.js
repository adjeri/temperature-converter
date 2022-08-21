const express = require("express");
const router = express.Router();
const temperatureController = require("../controllers/temperature.controller");

const {
    headerValidator,
    queryValidator,
} = require("../middleware/validators/index.middleware");

router.get('/', queryValidator, headerValidator, temperatureController.getTemperature); // localhost:3000/api/convert-temperature

module.exports = router;