const express = require("express");

const route = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const ListingControllers = require("../controllers/listing.js");
const multer = require("multer");
const { cloudinary, storage } = require("../cloudconfig.js");

const upload = multer({ storage });

const ExpressError = require("../utils/ExpressError.js");

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error.details.map((e) => e.message).join(", "));
  } else {
    next();
  }
};

route
  .route("/")
  .get(wrapAsync(ListingControllers.Index))
  .post(
    isLoggedIn,
    validateListing,
    upload.single("listing[image]"),
    wrapAsync(ListingControllers.CreateListing)
  );

//new route
route.get("/new", isLoggedIn, ListingControllers.RenderForm);

route
  .route("/:id")
  .get(wrapAsync(ListingControllers.ShowListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(ListingControllers.UpdateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(ListingControllers.DestroyListing));

//edit route

route.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(ListingControllers.EditListing)
);

module.exports = route;
