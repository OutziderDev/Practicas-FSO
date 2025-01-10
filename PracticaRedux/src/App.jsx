//import { useState,useEffect } from 'react'
import {createStore} from 'redux'

const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE') {
    return state.concat(action.payload)
  }

  return state
}

const store = createStore(noteReducer)

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})

const App = () => {
  return(
    <div>
      <ul>
        {store.getState().map(note=>
          <li key={note.id}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
        </ul>
    </div>
  )
}
/* const countReducer = (state = 0,action) =>{
  switch (action.type) {
    case 'INCREMENT': return state +1
    case 'DECREMENT': return state -1
    case 'ZERO':      return 0
    default:          return state;
  }
}
const store = createStore(countReducer)

function App() {
  const [count, setCount] = useState(store.getState())

  useEffect(() => {
    // Suscribirse al store
    const unsubscribe = store.subscribe(() => {
      setCount(store.getState());
    });

    // Limpiar la suscripción al desmontar
    return () => unsubscribe();
  }, [])

  return (
    <>
      <h1 className=''>Redux</h1>
      <br />
      <span>{count}</span>
      <div className='btn'>
        <button onClick={() => store.dispatch({type:'INCREMENT'})}>
          plus
        </button>
        <button onClick={() => store.dispatch({type:'DECREMENT'})}>
          minus
        </button>
        <button onClick={() => store.dispatch({type:'ZERO'})}>
          zero
        </button>
      </div>  
    </>
  )
} */

export default App
