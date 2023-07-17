// Import packages
const express = require('express')
const morgan = require('morgan')

// App
const app = express()

// Morgan
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./routes/index.routes'))

// Starting server
app.listen('1337')
