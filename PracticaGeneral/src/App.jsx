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
      .catch(() => {
        setErrorMesage(`Note '${changeNote.contenido}' was already removed from server`)
        setTimeout(() => {
          setErrorMesage(null)
        }, 5000);
        setNote(note.filter(n => n.id !== id)) //verificar por que tenia notes.filter
      })
  };
  const notesToShow = showAll ? note : note.filter(note => note.important)
  if (!note) return
  
  return(
    <>
      <div id='container'>
        <h1>Registro de Notas:</h1>
        <Notification message={errorMesage}/>
        <div className='grid'>
          <section> {/* Contenedor para Login */}
            <h3>Login</h3>
            <form id='form-login'>
              <label>Usuario:</label>
              <input type='text' id='user' name='user' placeholder='pepe'/>
              <br/>
              <label>Contraseña:</label>
              <input type='password' id='pass' name='pass' placeholder='pass456'/>
            </form> 
          </section>

          <section> {/*Contenedor para Notas */}
            <h3>Notas:</h3>
            <ul>
              {
                notesToShow.map((notex) => 
                  <Note key={notex.id} contenido={notex} toggleImportance={()=>toggleImportanceOf(notex.id)}/>
                )
              }        
            </ul>

            <form onSubmit={addNote} id='form-save'>
              <input type="text"
                    id='text'
                    value={newNote}
                    placeholder='Write your Note: Html is easy'
                    onChange={onChangeHandler}
              />
              <br />
              <button style={{marginTop:'5px'}} type='submit' id='but'>guardar</button>
            </form>

            
            <button id='btn' onClick={()=>setShowAll(!showAll)}>
              Ver {showAll ? 'importantes' : 'todas'}
            </button>
            
          </section>
        </div>
      </div>

      {//console.log(note)
      }
    </>
  );
}

export default App;
