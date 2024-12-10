const bcrypt = require('bcrypt')
const userRoute = require('express').Router()
const User = require('../models/userModel')

userRoute.get('/', async (reques,response) => {
  const users = await User.find({})
  response.json(users)
})

userRoute.post('/',async (request,response) => {
  const { username, name, password } = request.body
  const saltRound = 10
  const passwordHash = await bcrypt.hash(password,saltRound)

  const newUser = new User({
    username,
    name,
    passwordHash
  })

  const saveUser = await newUser.save()
  response.status(201).json(saveUser)
})

module.exports = userRoute