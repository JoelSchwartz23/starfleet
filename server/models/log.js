let mongoose = require('mongoose')
let bcrypt = require('bcryptjs')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let name = 'Log'

let schema = new Schema({
  text: { type: String },
  author: { type: ObjectId, ref: 'User' },
  date: { type: Number }
  // ship: { type: String }
})

module.exports = mongoose.model(name, schema)
