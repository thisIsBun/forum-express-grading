const db = require('../models')
const bcrypt = require('bcryptjs')

const { User } = db

const userController = {
  signUpPage: (req, res) => {
    res.render('signup')
  },
  signUp: (req, res, next) => {
    const { name, email, password, passwordCheck } = req.body
    if (password !== passwordCheck) throw new Error('Passwords do not match!')

    User.findOne({ where: { email } })
      .then(user => {
        if (user) throw new Error('Email already exists!')
        return bcrypt.hash(password, 10)
      }).then(hash => {
        return User.create({ name, email, password: hash })
      }).then(() => {
        req.flash('success_msg', 'Sign-up Successful!')
        res.redirect('/signin')
      }).catch(err => {
        return next(err)
      })
  },
  signInPage: (req, res) => {
    res.render('signin')
  },
  signIn: (req, res) => {
    req.flash('success_msg', 'Sign in success')
    res.redirect('/restaurants')
  },
  logout: (req, res) => {
    req.flash('success_msg', 'Logout success')
    req.logout()
    res.redirect('/signin')
  }
}

module.exports = userController
