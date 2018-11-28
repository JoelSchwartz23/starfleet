let router = require('express').Router()
let Logs = require('../models/log')
let Author = require('../models/user')



//Get all logs
router.get('', (req, res, next) => {
  Logs.find({})
    .then(logs => {
      res.send(logs)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})
//Get all logs by author
router.get('/:authorid', (req, res, next) => {
  Author.findById(req.params.authorid)
    .then(author => {
      Logs.find({ author: author._id })
        .then(logs => {
          return res.send({ author, logs })
        })
    })
    .catch(next)
})

//Create new Log
router.post('', (req, res, next) => {
  req.body.author = req.session.uid
  Logs.create(req.body)
    .then(log => res.send(log))
    .catch(next)
})
//Delete log
router.delete('/:logid', (req, res, next) => {
  Logs.findById(req.params.logid)
    .then(log => {
      if (log.author != req.session.uid) {
        res.send('Cannot delete logs that are not yours')
      }
      log.remove(() => {
        res.send("Deleted")
      })
    })
})

module.exports = router


