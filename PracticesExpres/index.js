const express = require('express')
const app = express()
const config = require('./utils/config')
const logger = require('./utils/logger')

const Note = require('./models/note')

app.use(express.static('dist'))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError'){
    return response.status(400).json({ error:error.message })
  }

  next(error)
}

const cors = require('cors')

app.use(cors())
app.use(express.json())

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/',(req,res) => {
  res.send('<h1>Hello Words!: </h1>')
})

app.get('/api/notes',(req,res) => {
  Note.find({}).then(notes => {
    res.json(notes)
  })
})

app.post('/api/notes', (request, response,next) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(404).json({  error : 'falto el contenido de la nota' })
  }

  const note = new Note({
    content:body.content,
    important: Boolean(body.important) || false
  })

  note.save()
    .then(saveNote => {
      response.json(saveNote)
    })
    .catch(error => next(error))
})

app.get('/api/notes/:id',(req,res,next) => {
  Note.findById(req.params.id)
    .then(findNote => {
      if (findNote) {
        res.json(findNote)
      }else{
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id',(req,res,next) => {
  Note.findByIdAndDelete(req.params.id).
    then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const { content,important } = request.body

  Note.findByIdAndUpdate(request.params.id, { content,important }, { new: true,runValidators:true,context:'query' })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(config.PORT,() => {
  logger.info(`Server running on port ${config.PORT} --`)
  logger.info('For exit of Server press CTRL + C')
})