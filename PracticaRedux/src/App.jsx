import { useState } from 'react'
import {createStore} from 'redux'

const countReducer = (state = 0,action) =>{
  switch (action.type) {
    case 'INCREMENT': return state +1
    case 'DECREMENT': return state -1
    case 'ZERO':      return 0

    default:          return state;
  }
}
const store = createStore(countReducer)

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className=''>Redux</h1>
      <br />
      <span>{store.getState()}</span>
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
}

export default App
