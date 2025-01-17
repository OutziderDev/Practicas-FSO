import axios from 'axios'

const baseUrl = "http://localhost:3001/notes"

export const getNotes = () => axios.get(baseUrl).then(resp => resp.data)

export const createNotes = (newNote) => axios.post(baseUrl,newNote).then(resp => resp.data)