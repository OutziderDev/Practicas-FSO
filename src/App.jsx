import { useState } from 'react';
import Note from './Components/Note';

const App = ({notes}) =>{
  const [note,setNote] = useState(notes);
  const [newNote,setNewNote] = useState('');
  
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
  

  return(
    <>
      <h1>Notas:</h1>
      <ul>
        {note.map((note) => 
            <Note key={note.id} contenido={note.content}/>
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
      {console.log(note)
      }
    </>
  );
}

export default App;
