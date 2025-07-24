const db = require('../models')
const bcrypt = require('bcryptjs')

const { User } = db

const userController = {
  signUpPage: (req, res) => {
    res.render('signup')
  },
  signUp: (req, res) => {
    const { name, email, password } = req.body
    bcrypt.hash(password, 10)
      .then(hash => {
        return User.create({ name, email, password: hash })
      })
      .then(() => {
        res.redirect('/signin')
      })
      .catch(error => {
        console.log(error)
      })
  }
}

module.exports = userController
