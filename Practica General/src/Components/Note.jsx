const Note = ({contenido, toggleImportance}) =>{
  const label = contenido.important ? 'make no importat' : 'make a importat';
  
    return (
      <li className="note">{contenido.content } - <button onClick={toggleImportance}>{label}</button></li>
    )
  }

export default Note;