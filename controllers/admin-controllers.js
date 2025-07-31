const { Restaurant } = require('../models')

const adminController = {
  getRestaurants: (req, res, next) => {
    Restaurant.findAll({ raw: true })
      .then(restaurants => {
        return res.render('admin/restaurants', { restaurants })
      })
      .catch(error => {
        return next(error)
      })
  },
  createRestaurant: (req, res) => {
    res.render('admin/create-restaurant')
  },
  editRestaurant: (req, res, next) => {
    const { name, tel, address, openingHours, description } = req.body
    if (!name) {
      throw new Error('Restaurant name is required!')
    }

    Restaurant.create({ name, tel, address, openingHours, description })
      .then(() => {
        req.flash('success_msg', 'Create restaurant success')
        res.redirect('/admin/restaurants')
      })
      .catch(error => {
        return next(error)
      })
  }
}

module.exports = adminController
