const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controllers')

router.get('/restaurants', adminController.getRestaurants)
router.get('/restaurants/create', adminController.createRestaurant)
router.post('/restaurants', adminController.editRestaurant)

router.use('/', (req, res) => {
  res.redirect('/admin/restaurants')
})

module.exports = router
