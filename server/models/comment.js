let mongoose = require('mongoose')
let bcrypt = require('bcryptjs')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let name = 'Comment'

let schema = new Schema({
  author: { type: ObjectId, ref: 'User', required: true },
  text: { type: String }
})

module.exports = mongoose.model(name, schema)