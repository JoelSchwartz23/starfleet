let mongoose = require('mongoose')
let bcrypt = require('bcryptjs')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let name = "User"
const SALT = 10;

let schema = new Schema({
  username: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  rank: { type: Number, required: true },
  hash: { type: String, required: true },
  log: { type: ObjectId, ref: 'Log' },
  ship: { type: ObjectId, ref: 'Ship' },
  shipname: { type: String }

})

schema.statics.hashPassword = function (password) {
  return bcrypt.hashSync(password, SALT)
}

schema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.hash)
}

let model = mongoose.model(name, schema)
module.exports = model