let readings = require('../data/readings.json')
const filename = './data/readings.json'
const helper = require('../helpers/helper.js')

function getReadings() {
    return new Promise((resolve, reject) => {
        if (readings.length === 0) {
            reject({
                message: 'no readings available',
                status: 202
            })
        }
        resolve(readings)
    })
}

function getReading(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(readings, id)
        .then(reading => resolve(reading))
        .catch(err => reject(err))
    })
}

function getReadingTotal(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(readings, id)
        .then(reading => resolve(reading))
        .catch(err => reject(err))
    })
}


function insertReading(newReading) {
    return new Promise((resolve) => {
        // This checks to see if previous readings from the device have been recorded
        const row = readings.find(r => r.id == newReading.id)
        
        // If this is a new device add an entry
        if (!row) {
            readings.push(newReading)
            helper.writeJSONFile(filename, readings)
            resolve(newReading)
        } else {

        // Check if this device has readings recorded at the new timestamps
        for (let i = 0; i < row.readings.length; i++) { 
            match = 0
            for (let j = 0; j < newReading.readings.length; j++) { 
                if (row.readings[j].timestamp == newReading.readings[i].timestamp) {
                    // Ignore duplicate readings
                    if (newReading.readings[j].count != row.readings[i].count) {
                      newReading.readings[j].count  += row.readings[i].count
                    }
                    match = 1
                }
            }
            if (match == 0) {
                newReading.readings.push(row.readings[i])
            }
        }

        // Remove the old entry and add the new entry
        readings = readings.filter(r => r.id !== newReading.id)
        readings.push(newReading)
        helper.writeJSONFile(filename, readings)
        resolve(newReading)
        }
    })
}

module.exports = {
    insertReading,
    getReadings,
    getReading,
    getReadingTotal 
}