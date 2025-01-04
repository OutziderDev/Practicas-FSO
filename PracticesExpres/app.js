const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const userRouter = require('./controllers/userController')
const loginRouter = require('./controllers/loginController')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
//app.use(middleware.requestLogger)
//Connecting to BD
mongoose.set('strictQuery',false)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB')
  }).catch((err) => {
    logger.error('error connecting to MongoDB',err)
  })

//app.use(middleware.unknownEndpoint)

app.use('/api/notes',notesRouter)
app.use('/api/users',userRouter)
app.use('/api/login',loginRouter)
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing',testingRouter)
}
//console.log('ya paso la llamada de ruta')
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app