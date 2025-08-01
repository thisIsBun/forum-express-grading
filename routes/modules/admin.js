const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controllers')
const upload = require('../../middleware/multer')

router.get('/restaurants', adminController.getRestaurants)
router.get('/restaurants/create', adminController.createRestaurant)
router.get('/restaurants/:id/edit', adminController.editRestaurant)
router.put('/restaurants/:id', upload.single('image'), adminController.putRestaurant)
router.delete('/restaurants/:id', adminController.deleteRestaurant)
router.get('/restaurants/:id', adminController.getRestaurant)
router.post('/restaurants', upload.single('image'), adminController.postRestaurant)

router.use('/', (req, res) => {
  res.redirect('/admin/restaurants')
})

module.exports = router
