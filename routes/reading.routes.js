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