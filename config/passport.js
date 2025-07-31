const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')
const db = require('../models')

const { User } = db

passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
  User.findOne({ where: { email } })
    .then(user => {
      if (!user) {
        return done(null, false, req.flash('error_msg', 'Email or password incorrect!'))
      }
      bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch) {
          return done(null, false, req.flash('error_msg', 'Email or password incorrect!!'))
        }
        return done(null, user)
      })
    })
    .catch(error => {
      done(error)
    })
}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then(user => {
      return done(null, user.toJSON())
    })
    .catch(error => {
      done(error, null)
    })
})

module.exports = passport
