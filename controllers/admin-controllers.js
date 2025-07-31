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
  getRestaurant: (req, res, next) => {
    Restaurant.findByPk(req.params.id, { raw: true })
      .then(restaurant => {
        if (!restaurant) {
          throw new Error('Restaurant not exist')
        }
        return res.render('admin/restaurant', { restaurant })
      })
      .catch(error => {
        return next(error)
      })
  },
  createRestaurant: (req, res) => {
    res.render('admin/create-restaurant')
  },
  postRestaurant: (req, res, next) => {
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
  },
  editRestaurant: (req, res, next) => {
    Restaurant.findByPk(req.params.id, { raw: true })
      .then(restaurant => {
        if (!restaurant) {
          throw new Error('Restaurant not exist')
        }
        console.log(1, restaurant)
        return res.render('admin/edit-restaurant', { restaurant })
      })
      .catch(error => {
        return next(error)
      })
  },
  putRestaurant: (req, res, next) => {
    const { name, tel, address, openingHours, description } = req.body
    if (!name) {
      throw new Error('Restaurant name is required!')
    }
    Restaurant.findByPk(req.params.id)
      .then(restaurant => {
        return restaurant.update({ name, tel, address, openingHours, description })
      })
      .then(() => {
        req.flash('success_msg', 'Update restaurant success')
        res.redirect('/admin/restaurants')
      })
      .catch(error => {
        return next(error)
      })
  }
}

module.exports = adminController
