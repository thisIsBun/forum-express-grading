const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controllers')

router.get('/restaurants', adminController.getRestaurants)
router.get('/restaurants/create', adminController.createRestaurant)
router.get('/restaurants/:id/edit', adminController.editRestaurant)
router.put('/restaurants/:id', adminController.putRestaurant)
router.delete('/restaurants/:id', adminController.deleteRestaurant)
router.get('/restaurants/:id', adminController.getRestaurant)
router.post('/restaurants', adminController.postRestaurant)

router.use('/', (req, res) => {
  res.redirect('/admin/restaurants')
})

module.exports = router
