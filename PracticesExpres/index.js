const express = require('express');
const app = express();
require('dotenv').config();

const Note = require('./models/note');

app.use(express.static('dist'));

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

const cors = require('cors');

app.use(cors());
app.use(express.json())
const PORT = process.env.PORT // Puerto 

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
  
app.get('/',(req,res)=>{
    res.send(`<h1>Hello Words!: </h1>`)
})

app.get('/api/notes',(req,res)=>{
  Note.find({}).then(notes => {
    res.json(notes)
  })
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(404).json({  error : "falto el contenido de la nota"    })
  }

  const note = new Note({
    content:body.content,
    important: Boolean(body.important) || false
  })

  note.save().then(saveNote =>{
    response.json(saveNote)
  })
  
})

app.get(`/api/notes/:id`,(req,res,next)=>{
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

app.delete(`/api/notes/:id`,(req,res,next)=>{
  Note.findByIdAndDelete(req.params.id).
  then(result => {
    res.status(204).end()
  })
  .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT} --`);
    console.log('For exit of Server press CTRL + C');  
});