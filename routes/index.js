const express = require('express')
const router = express.Router()
const restaurantController = require('../controllers/restaurant-controller.js')
const userController = require('../controllers/user-controllers.js')
const admin = require('./modules/admin.js')
const { generalErrorHandler } = require('../middleware/error-handler.js')
const passport = require('../config/passport.js')
const { authenticated } = require('../middleware/auth.js')

router.use('/admin', admin)

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin' }), userController.signIn)
router.get('/logout', userController.logout)

router.get('/restaurants', authenticated, restaurantController.getRestaurants)

router.use('/', (req, res) => res.redirect('/restaurants'))
router.use('/', generalErrorHandler)

module.exports = router
