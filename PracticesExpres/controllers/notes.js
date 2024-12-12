const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

notesRouter.get('/', async (request,response) => {
  const notes = await  Note
    .find({}).populate('user',{ username:1,name:1 })
  response.json(notes)
})

notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id)

  if (note) {
    response.json(note)
  }else{
    response.status(404).end()
  }
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ','')
  }
  return null
}

notesRouter.post( '/', async (request,response) => {
  const body = request.body
  //log(body)

  const decodedToken = jwt.verify(getTokenFrom(request),process.env.SECRET)
  if (!decodedToken) {
    return response.status(401).json({ error:'Token invalid' })
  }

  if (!body.user || !body.content) {
    response.status(404).json({ error:'missing user or content note' })
  }

  const user = await User.findById(body.user)
  //console.log('Los datos de Usuario',user)

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user.id
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  response.status(201).json(savedNote)
})

notesRouter.delete('/:id', async (request,response) => {
  await Note.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

notesRouter.put('/:id', async (req, resp) => {
  const body = req.body

  const note = {
    content: body.content,
    important: body.important
  }

  const update = await  Note.findByIdAndUpdate(req.params.id, note, { new: true })
  resp.json(update)
})

module.exports = notesRouter