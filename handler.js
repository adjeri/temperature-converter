'use strict';
const server = require('./src/server')
const serverless = require('serverless-http')
module.exports.conversion = serverless(server)
