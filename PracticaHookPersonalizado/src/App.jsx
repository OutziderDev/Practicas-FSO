//import { useState } from 'react'
import useCounter from './useCounter'
import useField  from './useField'


function App() {
  //const [count, setCount] = useState(0)
  const counter = useCounter()
  const left = useCounter()
  const right = useCounter()
  const name = useField('text')
  const born = useField('date')
  const height = useField('number')
  return (
    <>
      
      <h1>Contador:</h1>
      <div>{counter.value}</div>
      <button onClick={counter.increment}>plus</button>
      <button onClick={counter.decrement}>minus</button>
      <button onClick={counter.zero}>zero</button>

      <hr />
      <h2>Cantidad de Clicks</h2>
      <div>
        <span>Click izquierdos: {left.value} y derechos: {right.value}</span>
        <br />
        <button onClick={left.increment}>left</button>
         <button onClick={right.increment}>right</button>
      </div>

      <hr />
      <form>
        name: 
        <input  {...name} /> 
        <br/> 
        birthdate:
        <input {...born} />
        <br /> 
        height:
        <input {...height} />
      </form>
      <div>
        {name.value} {born.value} {height.value}
      </div>
    </>
  )
}

export default App
