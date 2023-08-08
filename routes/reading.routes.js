const express = require('express')
const router = express.Router()
const reading = require('../models/reading.model')
const m = require('../helpers/middlewares')

/* All posts */
router.get('/', async (req, res) => {
    await reading.getReadings()
    .then(readings => res.json(readings))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* A post by id */
router.get('/:id', async (req, res) => {
    const id = req.params.id
    await reading.getReading(id)
    .then(reading => res.json({"readings":reading.readings}))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* A post by id */
router.get('/:id/total', async (req, res) => {
    const id = req.params.id
    console.log("TEST")
    await reading.getReading(id)
    .then(
        reading => {
        totalCount = 0
        for ( let j = 0; j < reading.readings.length; j++ ) {
            console.log(reading.readings[j].count)
            totalCount += reading.readings[j].count
            } 
          
            res.json({"total":totalCount})
    })
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

router.get('/:id/latest', async (req, res) => {
    const id = req.params.id
    console.log("TEST")
    await reading.getReading(id)
    .then(
        reading => {
        latestTime = "2000-09-29T30:09:16+01:00 "
        for ( let j = 0; j < reading.readings.length; j++ ) {
            console.log(reading.readings[j].timestamp)
            if  (reading.readings[j].timestamp > latestTime){
              latestTime = reading.readings[j].timestamp
            }
            } 
          
            res.json({"latest":latestTime})
    })
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* Insert a new post */
router.post('/', m.checkFieldsReading, async (req, res) => {
    await reading.insertReading(req.body)
    .then(reading => res.status(201).json({
        message: `The reading #${reading.id} has been created`,
        content: reading
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

module.exports = router