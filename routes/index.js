const Router = require('express').Router()

Router
    .use('/task', require('./task'))

module.exports = Router;