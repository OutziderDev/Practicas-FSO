const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const Note = require('../models/note')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

describe('Supertest', () => {

  beforeEach(async () => {
    await Note.deleteMany({})

    let noteObject = new Note(helper.initialNotes[0])
    await noteObject.save()

    noteObject = new Note (helper.initialNotes[1])
    await noteObject.save()
  })

  test('GET/ notes are returned as json', async () => {
    /*await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)*/
  })

  test('GET/ there are two notes', async () => {
    const response = await helper.notesInDB()

    assert.strictEqual(response.length, helper.initialNotes.length)
  })

  test('GET/ the first note is about HTTP methods', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(e => e.content)
    assert(contents.includes('HTML is easy'))
  })

  /*--------------------------------Test Para el POST-------------------------------*/

  test('POST/ a valid note can be added', async () => {
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const notesAtEnd = await helper.notesInDB()
    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

    const contents = notesAtEnd.map(r => r.content)
    assert(contents.includes('async/await simplifies making async calls'))
  })

  test('POST/ note without content is not added', async () => {
    const newNote = {
      important:true
    }
    await api
      .post('/api/notes')
      .send(newNote)
      .expect(404)

    const notesAtEnd = await helper.notesInDB()
    assert.strictEqual(notesAtEnd.length,helper.initialNotes.length)
  })
  /*------------------------------------------------------------------------------- */
  /* ----------------Seccion para test de ver una sola nota y de borrar------------- */
  test('GET ONE/ a specific note can be viewed', async () => {
    const notesAtStart = await helper.notesInDB()
    const noteToView = notesAtStart[0]

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(resultNote.body, noteToView)
  })

  test('DELETE/ a note can be deleted', async () => {
    const notesAtStart = await helper.notesInDB()
    const noteToDelete = notesAtStart[0]

    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204)

    const notesAtEnd = await helper.notesInDB()

    const contents = notesAtEnd.map(r => r.content)
    assert(!contents.includes(noteToDelete.content))

    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
  })

  after(async () => {
    await mongoose.connection.close()
  })

})