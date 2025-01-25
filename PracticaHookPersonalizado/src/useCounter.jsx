import { useState } from "react"

const useCounter = () => {
 
  const [value,setValue]  = useState(0)

  const increment = () => {
    setValue(value +1)
  }

  const decrement = () => {
    setValue(value - 1)
  }

  const zero = () => {
    setValue(0)
  }

  

  return {    value,  increment,  decrement,  zero }
  
}

export default useCounter