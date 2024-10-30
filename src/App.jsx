import { useState,useEffect } from 'react';
import Note from './Components/Note';
import noteService from './Services/node.js'

const App = () =>{
  // useStates and Effect
  const [note,setNote] = useState([]);
  const [newNote,setNewNote] = useState('');
  const [showAll,setShowAll] = useState(true);
  //console.log(noteService.getAll);  
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
        alert(`the note ${changeNote.contenido} was already deleted from server`

        )
        setNote(notes.filter(n => n.id !== id))
      })
  };
  const notesToShow = showAll ? note : note.filter(note => note.important)

  return(
    <>
      <h1>Notas:</h1>
      <ul>
        {notesToShow.map((notex) => 
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
