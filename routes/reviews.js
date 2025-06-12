const express = require("express");
const route = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isReviewAuthor}= require("../middleware.js");
const { reviewSchema } = require("../schema.js");
const ReviewController= require("../controllers/review.js");

const Review = require("../models/reviews.js");
const ExpressError = require("../utils/ExpressError.js");

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error.details.map((e) => e.message).join(", "));
  } else {
    next();
  }
};

//Reviews
//Post Route

route.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(ReviewController.CreateReview)
);

//DELETE REVIEW ROUTE
route.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(ReviewController.DeleteReview)
);

module.exports = route;
