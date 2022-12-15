const router = require("express").Router()

const User = require("../models/User.model")

const { isAuthenticated } = require('./../middleware/jwt.middleware')



router.post('/signup', (req, res, next) => {

  const { email, password, username } = req.body

  User
    .create({ email, password, username })
    .then((createdUser) => {

      const { email, username, _id } = createdUser
      const user = { email, username, _id }

      res.status(201).json({ user })
    })
    .catch(err => next(err))
})



router.post('/login', (req, res, next) => {

  const { email, password } = req.body

  if (email === '' || password === '') {
    res.status(400).json({ errorMessages: ['Indica email y contraseña'] })
    return
  }

  User
    .findOne({ email })
    .then(foundUser => {
      if (foundUser && foundUser.validatePassword(password)) {
        res.status(200).json({ authToken: foundUser.signToken() })
      }
      else {
        res.status(401).json({ messages: ['Usuario o contraseña incorrectos'] })
      }
    })
    .catch(err => next(err))
})




router.get('/verify', isAuthenticated, (req, res) => {
  res.status(200).json(req.payload)
})


module.exports = router
