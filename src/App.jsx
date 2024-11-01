import { useState,useEffect } from 'react';
import Note from './Components/Note';
import noteService from './Services/node.js'
import Notification from './Components/Notification.jsx'

const App = () =>{
  // useStates and Effect
  const [note,setNote] = useState(null);
  const [newNote,setNewNote] = useState('');
  const [showAll,setShowAll] = useState(true);
  const [errorMesage, setErrorMesage] = useState(null);
  useEffect(() => {noteService.getAll().then(intialNote => setNote(intialNote))},[])

  //Funciones de utilidades
  const addNote = (event) =>{
    event.preventDefault();
    const noteObject = {
      content:newNote,
      important: Math.random()<0.5,
    }
    noteService.create(noteObject).then(createNote=>{
      setNote(note.concat(createNote)); 
      setNewNote('') 
    })
  
  }
  const onChangeHandler = (event) => setNewNote(event.target.value);

  const toggleImportanceOf = (id) => {
    const noteForServer = note.find(n=>n.id === id);
    const changeNote = {...noteForServer, important: !noteForServer.important}

    noteService
      .Update(id,changeNote)
      .then(UpdateNote => {
        setNote(note.map(noteForServerSet => noteForServerSet.id !== id ? noteForServerSet : UpdateNote))
      })
      .catch(error => {
        setErrorMesage(`Note '${changeNote.contenido}' was already removed from server`)
        setTimeout(() => {
          setErrorMesage(null)
        }, 5000);
        setNote(notes.filter(n => n.id !== id))
      })
  };
  const notesToShow = showAll ? note : note.filter(note => note.important)
  if (!note) return
  
  return(
    <>
      <h1>Notas:</h1>
      <Notification message={errorMesage}/>
      <ul>
        {
          notesToShow.map((notex) => 
            <Note key={notex.id} contenido={notex} toggleImportance={()=>toggleImportanceOf(notex.id)}/>
          )
        }        
      </ul>
      <form onSubmit={addNote} id='form'>
        <input type="text"
               id='text'
               value={newNote}
               onChange={onChangeHandler}
        />
        <br />
        <button style={{marginTop:'5px'}} type='submit' id='but'>guardar</button>
      </form>
      <br />
      <button onClick={()=>setShowAll(!showAll)}>
        Ver {showAll ? 'importantes' : 'todas'}
      </button>
      {//console.log(note)
      }
    </>
  );
}

export default App;
