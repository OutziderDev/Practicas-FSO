const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/',(request,response) => {
  //console.log('Esta en la llamada')
  Note.find({})
    .then((notes) => {
      response.json(notes)
    }).catch((err) => console.log(err))
})

notesRouter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note)
      }else{ response.status(404).end()}
    }).catch((err) => next(err))
})

notesRouter.post( '/', (request,response,next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false
  })

  note.save()
    .then((result) => {
      response.json(result)
    }).catch((err) => next(err))
})

notesRouter.delete('/:id',(request,response,next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    }).catch((error) => next(error) )
})

notesRouter.put('/:id', (req, resp, next) => {
  const body = req.body

  const note = {
    content: body.content,
    important: body.important
  }

  Note.findByIdAndUpdate(req.params.id, note, { new: true })
    .then((updatedNote) => {
      resp.json(updatedNote)
    }).catch((err) => next(err))
})

module.exports = notesRouter