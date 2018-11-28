let router = require('express').Router()
let Users = require('../models/user')
let session = require('./session')

//Create a new session
router.post('/login', (req, res, next) => {
  Users.findOne({ username: req.body.username })
    .then(user => {
      if (!user) {
        return next(new Error("Invalid Username or Password"))
      }
      if (!user.validatePassword(req.body.password)) {
        return next(new Error("Invalid Username or Password"))
      }
      delete user._doc.hash
      req.session.uid = user._id
      res.send(user)
    })
    .catch(next)
})

//Register user
router.post('/register', (req, res, next) => {
  // @ts-ignore
  let hash = Users.hashPassword(req.body.password)
  Users.create({ username: req.body.username, hash, title: req.body.title, rank: req.body.rank, shipname: req.body.shipname })
    .then(user => {
      delete user._doc.hash
      req.session.uid = user._id
      res.send(user)
    })
    .catch(err => {
      next(new Error("Invalid Username or Password creation"))
    })
})

//Delete 
router.delete('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      return next(err)
    }
    return res.send({ message: "Successfully Logged Out" })
  })
})

//authenticate session token
router.get('/authenticate', (req, res, next) => {
  if (!req.session.uid) {
    return next(new Error("Invalid Credentials"))
  }
  Users.findById(req.session.uid)
    .then(user => {
      delete user._doc.hash
      res.send(user)
    })
    .catch(err => next(new Error("Invalid Credentials")))
})

module.exports = { router, session }