const mongoose = require('mongoose')
const connectionString = 'mongodb://student1:student1@ds217864.mlab.com:17864/starfleet'
const connection = mongoose.connection

mongoose.connect(connectionString, { useNewUrlParser: true })

connection.on('error', err => {
  console.log('ERROR FROM DATABASE: ', err)
})


connection.once('open', () => {
  console.log('Connected to Database')
})