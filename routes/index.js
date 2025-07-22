const express = require('express')
const router = express.Router()
const restaurantController = require('../controllers/restaurant-controller.js')
const admin = require('./modules/admin.js')

router.use('/admin', admin)
router.get('/restaurants', restaurantController.getRestaurants)
router.use('/', (req, res) => res.redirect('/restaurants'))

module.exports = router
