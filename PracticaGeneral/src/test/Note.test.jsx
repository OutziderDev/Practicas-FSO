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

  expect(mockHandler.mock.calls).toHaveLength(1)
  //screen.debug(div)
  /* expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  ) */
})

test('renders button with correct label', () => {
  const note = {
    content: 'Component testing is done with react-testing-library -',
    important: true
  }

  render(<Note contenido={note} />)

  const button = screen.getByText('make no importat')
  expect(button).toBeInTheDocument()
})

