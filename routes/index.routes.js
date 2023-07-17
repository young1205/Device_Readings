const express = require('express')
const router = express.Router()
router.use('/api/v1/readings', require('./reading.routes'))

module.exports = router