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

notesRouter.post('/', async (request, response) => {

  const { body } = request
  // Verifica el token
  const token = getTokenFrom(request)

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Token missing or invalid' })
  }

  // Verifica los campos requeridos en el body
  if (!body.content) {
    return response.status(400).json({ error: 'Content is missing' })
  }

  // Busca al usuario correspondiente
  const user = await User.findById(decodedToken.id)
  if (!user) {
    return response.status(404).json({ error: 'User not found' })
  }
  //console.log('user', user)
  // Crea una nueva instancia del modelo Note
  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user._id, // Relaciona la nota con el usuario
  })
  //console.log('note', note)
  // Guarda la nota en la base de datos
  const savedNote = await note.save()
  //console.log('Saved Note:', savedNote)

  // Actualiza la lista de notas del usuario
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  // Devuelve la nota guardada al cliente
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