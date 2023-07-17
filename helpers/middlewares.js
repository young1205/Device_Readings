function checkFieldsReading(req, res, next) {
    const { id, readings } = req.body
    if ( id && readings ) {
        malcount = 0
        for ( let j = 0; j < readings.length; j++ ) {
          if ( !Number.isInteger(readings[j].count)) {
            malcount += 1
          } 
        }
       if ( malcount != 0 ) {
         res.status(400).json({ message: 'counts are not integers' })
       } else {
         next()
       }
    } else {
        res.status(400).json({ message: 'fields are not good' })
    }
}

module.exports = {
    checkFieldsReading
}