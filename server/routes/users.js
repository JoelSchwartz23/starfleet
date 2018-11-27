let router = require('express').Router()
let Users = require('../models/user')
let Logs = require('../models/log')


// Get all Users/crew
router.get('/', (req, res, next) => {
  Users.find({})
    .then(users => res.send(users))
    .catch(next)
})

//Get user by ID
router.get('/:userid', (req, res, next) => {
  Users.findById(req.params.userid)
    .then(user => res.send(user))
    .catch(next)
})

//Get user and Logs
router.get('/:userid/logs', (req, res, next) => {
  Users.findById(req.params.userid)
    .then(user => {
      Logs.find({ author: user._id })
        .then(logs => {
          return res.send({ user, logs })
        })
    })
    .catch(next)
})

module.exports = router