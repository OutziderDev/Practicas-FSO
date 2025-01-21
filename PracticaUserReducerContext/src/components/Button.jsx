import { useCounterDispatch } from '../CounterContext'
import ProTypes from 'prop-types'

const Button = ({ type, label }) => {
  const dispatch = useCounterDispatch()
  return (
    <button onClick={() => dispatch({ type })}>
      {label}
    </button>
  )
}

export default Button

Button.propTypes = {
  type: ProTypes.string.isRequired,
  label: ProTypes.string.isRequired
}