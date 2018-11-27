let mongoose = require('mongoose')
let bcrypt = require('bcryptjs')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let name = "User"
const SALT = 10;

let schema = new Schema({
  username: { type: String, required: true, unique: true },
  rank: { type: String, required: true },
  hash: { type: String, required: true },
  log: { type: ObjectId, ref: 'Log' }
})

schema.statics.hashPassword = function (password) {
  return bcrypt.hashSync(password, SALT)
}

schema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.hash)
}

let model = mongoose.model(name, schema)
module.exports = model