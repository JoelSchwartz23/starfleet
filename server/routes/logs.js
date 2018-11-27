let router = require('express').Router()
let Logs = require('../models/log')



//Get all logs
router.get('/api/logs', (req, res, next) => {
  Logs.find({})
    .then(logs => {
      res.send(logs)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})
//Create new Log
router.post('/api/logs', (req, res, next) => {
  req.body.author = req.session.uid
  Logs.create(req.body)
    .then(newLog => {
      res.send(newLog)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})
//Delete log
router.delete('/api/logs/:logid', (req, res, next) => {
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


