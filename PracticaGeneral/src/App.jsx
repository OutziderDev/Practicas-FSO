import { useState,useEffect } from 'react';
import Notification from './Components/Notification.jsx'
import LoginForm from './Components/LoginForm.jsx';
import Note from './Components/Note';

import noteService from './Services/node.js'
import loginService from './Services/login.js'
import Togglable from './Components/Toggable.jsx';

const App = () =>{
  // useStates and Effect
  const [note,setNote] = useState(null);
  const [newNote,setNewNote] = useState('');
  const [showAll,setShowAll] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMesage, setErrorMesage] = useState(null);
  const [loginVisible,setLoginVisible] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
     const fetchNotes = async () => {
       const initialNote = await noteService.getAll()
       setNote(initialNote)
     }
     fetchNotes()
    },[])

  //Funciones de utilidades
  const addNote = async (event) =>{
    event.preventDefault()
    try {
      const noteObject = {
        content:newNote,
        important: Math.random()<0.5,
      }
      
      const noteResponse = await noteService.create(noteObject)
      //console.log('la resp',noteResponse);
      setNote(note.concat(noteResponse))
    } catch (error) {
      
    }
    
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
  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }
  
  const notesToShow = showAll ? note : note.filter(note => note.important)

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <Togglable buttonLabel='log in'>
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
          </Togglable>  
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const noteForm = () => (
    <>
    <h3>Add Nota:</h3>
    <form onSubmit={addNote} id='form-save'>
      <input type="text"
            id='text'
            data-testid='note'
            value={newNote}
            placeholder='Write your Note: Html is easy'
            onChange={onChangeHandler}
      />
    
      <button data-testid='guardar' style={{marginTop:'5px'}} type='submit' id='but'>guardar</button>
    </form>
    <button onClick={handleLogout} style={{padding:5  ,display:'flex', justifyContent:'center', alignContent:'center', backgroundColor:'red', color:'white'}}>LogOut</button>
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
