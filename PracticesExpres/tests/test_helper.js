const Note = require('../models/note')
const User = require('../models/userModel')

const initialNotes = [
  {
    content : 'HTML is easy',
    important: false
  },{
    content: 'Browser can execute only JavaScript',
    important: true,
  }
]

const initialUser = [
  {
    username: 'admin',
    name: 'admin',
    passwordHash: '123'
  }
]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

const notesInDB = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = { initialNotes,initialUser,nonExistingId,notesInDB,usersInDb }