const express = require('express');

const wrapAsync = require('../utils/wrapAsync.js');
const { isLoggedIn } = require('../middleware.js');
const route = express.Router();
const bookingController = require('../controllers/booking.js');

route.get('/invoice', bookingController.Invoice);

//  Show form

route
  .route('/:id')
  .get(isLoggedIn, wrapAsync(bookingController.ShowForm))
  .post(wrapAsync(bookingController.HandlePost));

module.exports = route;
