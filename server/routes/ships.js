let router = require('express').Router()
let Ships = require('../models/ship')
let Users = require('../models/user')



//create a ship
router.post('/', (req, res, next) => {
  Ships.create(req.body)
    .then(ship => res.send(ship))
    .catch(next)
})

//add user to ship
router.put('/:shipid/addUser', (req, res, next) => {
  Ships.findById(req.params.shipid)
    .then(ship => {
      ship.users.push(req.body.userId)
      ship.save(() => {
        res.send(ship)
      })
    })
    .catch(next)
})

module.exports = router