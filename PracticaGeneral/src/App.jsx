import { useState,useEffect } from 'react';
import Notification from './Components/Notification.jsx'
import Note from './Components/Note';

import noteService from './Services/node.js'
import loginService from './Services/login.js'

const App = () =>{
  // useStates and Effect
  const [note,setNote] = useState(null);
  const [newNote,setNewNote] = useState('');
  const [showAll,setShowAll] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMesage, setErrorMesage] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    /* noteService
      .getAll()
      .then(intialNote =>
         setNote(intialNote)
      ) */
     const fetchNotes = async () => {
       const initialNote = await noteService.getAll()
       setNote(initialNote)
     }
     fetchNotes()
    },[])

  //Funciones de utilidades
  const addNote =  (event) =>{
    event.preventDefault()
    const noteObject = {
      content:newNote,
      important: Math.random()<0.5,
    }
    noteService
      .create(noteObject)
      .then(createNote=>{
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
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username,password})
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      noteService.setToken(user.token)
      setUser(user)
      console.log('user',user.token)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMesage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000)
    }
  }
  
  const notesToShow = showAll ? note : note.filter(note => note.important)

  const loginForm = () => (
  <>  
    <h3>Login</h3>
    <form id='form-login' onSubmit={handleLogin}>
      <label>Usuario:</label>
      <input type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)} placeholder='username'/> 

      <label>Contraseña:</label>
      <input type='password' value={password} name='Password' onChange={({ target }) => setPassword(target.value)} placeholder='password'/>

      <button type="submit">login</button>
    </form> 
    </>  
  )

  const noteForm = () => (
    <>
    <h3>Add Nota:</h3>
    <form onSubmit={addNote} id='form-save'>
      <input type="text"
            id='text'
            value={newNote}
            placeholder='Write your Note: Html is easy'
            onChange={onChangeHandler}
      />
    
      <button style={{marginTop:'5px'}} type='submit' id='but'>guardar</button>
    </form>
    </>
  )

  if (!note) return
  
  return(
    <>
      <div id='container'>
        <h1>Registro de Notas:</h1>
        <Notification message={errorMesage}/>
        <div className='grid'>
          <section> {/* Contenedor para Login */}
          {user === null ?
            loginForm() :
            noteForm()
          }
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
