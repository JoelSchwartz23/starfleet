let express = require('express')
let bodyParser = require('body-parser')
require('./server/db/mlab-config')
let server = express()
const PORT = 3000


server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(express.static(__dirname + '/public'))

let auth = require('./server/auth/routes')
server.use(auth.session)
server.use('/account', auth.router)

//for any request
server.use('*', (req, res, next) => {
  if (req.method == "GET") {
    return next()
  }
  if (!req.session.uid) {
    return next(new Error("Please Login to continue"))
  }
  next()
})



// Routes
let userRoutes = require('./server/routes/users')
let logRoutes = require('./server/routes/logs')
server.use('/api/users', userRoutes)
server.use('/api/logs', logRoutes)
// let commentRoutes = require('./server/routes/comments')



server.use('*', (error, req, res, next) => {
  res.status(error.status || 400).send({ message: error.message })
})

server.listen(PORT, () => {
  console.log("server running", PORT)
})