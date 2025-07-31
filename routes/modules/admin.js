const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controllers')

router.get('/restaurants', adminController.getRestaurants)
router.get('/restaurants/create', adminController.getCreateRestaurant)
router.get('/restaurants/:id', adminController.getRestaurant)
router.post('/restaurants', adminController.createRestaurant)

router.use('/', (req, res) => {
  res.redirect('/admin/restaurants')
})

module.exports = router
