import { useState } from 'react';
import Note from './Components/Note';

const App = ({notes}) =>{
  const [note,setNote] = useState(notes);
  const [newNote,setNewNote] = useState('');
  const [showAll,setShowAll] = useState(true);
  
  const addNote = (event) =>{
    event.preventDefault();
    const forArchivateNote = {
      id:note.length+1,
      content:newNote,
      important: Math.random()<0.5,
    }
    setNote(note.concat(forArchivateNote));
    setNewNote('') 
  }
  const onChangeHandler = (event) => setNewNote(event.target.value)
  
  const notesToShow = showAll ? note : note.filter(note => note.important)

  return(
    <>
      <h1>Notas:</h1>
      <ul>
        {notesToShow.map((notex) => 
            <Note key={notex.id} contenido={notex.content}/>
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
        <button type='submit' id='but'>guardar</button>
      </form>
      <br />
      <button onClick={()=>setShowAll(!showAll)}>
        Ver {showAll ? 'importantes' : 'todas'}
      </button>
      {console.log(note)
      }
    </>
  );
}

export default App;
