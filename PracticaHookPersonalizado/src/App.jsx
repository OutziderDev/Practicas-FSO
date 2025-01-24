import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <h1>Contador:</h1>
      <div>{count}</div>
      <button>plus</button>
      <button>minus</button>
      <button>zero</button>
    </>
  )
}

export default App
