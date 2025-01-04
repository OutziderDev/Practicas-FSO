import { render, screen } from '@testing-library/react'
import useEvent from '@testing-library/user-event'
import Note from '../Components/Note'

test('renders content', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const mockHandler = vi.fn()

   render(<Note contenido={note} toggleImportance={mockHandler} />)
  
  const user = useEvent.setup()
  const button = screen.getByText('make no important')
  await user.click(button)
  //screen.debug(div)
  /* expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  ) */
})

test('renders button with correct label', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  render(<Note contenido={note} />)

  // Verifica que el texto del botón coincida
  const button = screen.getByText('make no important')
  expect(button).toBeInTheDocument()
})

