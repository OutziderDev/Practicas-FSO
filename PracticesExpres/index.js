const express = require('express');
const app = express();
const PORT = 3001
const id = 0

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
    res.json(notes)
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

 app.delete(`/api/notes/:id`,(req,res)=>{
    const id = Number(req.params.id)
    const notesDel = notes.filter(note => note.id !== id)

    res.status(204).end()
 })


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT} --`);
});
