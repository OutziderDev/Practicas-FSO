require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const Note = require('./models/note');
app.use(cors());
app.use(express.static('dist'));
const PORT = process.env.PORT


let notes = [
  {
    id: 1,
    content: "HTML is not Easy",
    important: false
  },
  {
    id: 2,
    content: "El navegador puede ejecutar solo JavaScript",
    important: false
  },
  {
    id: 3,
    content: "El metodo GET y POST son los mas importantes del protocolo HTTP.",
    important: false
  },
  {
    id: 4,
    content: "Maria la de paco",
    important: false
  },
  {
    id: 5,
    content: "La pizza es vida",
    important: true
  }
]
  
 app.get('/',(req,res)=>{
    res.send(`<h1>Hello Words!: ${notes[0].content}</h1>`)
 })

 app.get('/api/notes',(req,res)=>{
    Note.find({}).then(notes => {
      res.json(notes)
    })
 })

 app.get(`/api/note/:id`,(req,res)=>{
    const id = Number(req.params.id);
    const note = notes.find(note =>  note.id === id)
    if (note) {
        res.json(note)
    }else{
        res.status(404).json({error:'no encontrada'})
    }
 })

 app.use(express.json())
 app.delete(`/api/notes/:id`,(req,res)=>{
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)

    res.status(204).end()
 })

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(404).json({
      error : "falto el contenido de la nota"
    })
  }
  const note = {
    id: generateId(),
    content: body.content,
    importat: Boolean(body.important) || false
  }
  notes = notes.concat(note);
  response.json(note);
})

//Funciones de apoyo
const generateId = () =>{
  const MaxID = notes.length >0 ? Math.max(...notes.map(max => max.id)) : 0
  return MaxID + 1
}

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT} --`);
    console.log('For exit of Server press CTRL + C');
    
});
