let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let name = 'Ship'


let schema = new Schema({
  name: { type: String, required: true },
  imgurl: { type: String, required: true },
  users: [{ type: ObjectId, ref: 'User' }]
})

module.exports = mongoose.model(name, schema)