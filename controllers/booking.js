const Listing = require("../models/listing.js");

module.exports.Invoice= (req, res) => {
  const booking = req.session.booking;
  if (!booking) {
    req.flash("error", "No booking details found.");
    return res.redirect("/listings");
  }
  res.render("booking/invoice", { booking });
};

module.exports.ShowForm =async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("booking/form", { listing });
};

module.exports.HandlePost= async (req, res) => {
  const listingId = req.params.id;
  const {
    fullname,
    email,
    phone,
    guests,
    children,
    checkin,
    checkout,
    specialRequests,
    promoCode,
    totalPrice,
    nights,
    discountRate,
    childCost,
    tax
  } = req.body;

  const listing = await Listing.findById(listingId);
  if (!listing) {
    req.flash("error", "Listing not found.");
    return res.redirect("/listings");
  }

  const pricePerNight = listing.discountPrice || listing.price;

  req.session.booking = {
    listingId,
    listingTitle: listing.title,
    fullname,
    email,
    phone,
    guests,
    children,
    checkin,
    checkout,
    specialRequests,
    promoCode,
    pricePerNight,
    totalPrice: Number(totalPrice),
    nights: Number(nights),
    discountRate: Number(discountRate),
    childCost: Number(childCost),
    tax: Number(tax),
  };

  req.flash("success", "Booking confirmed.");
  res.redirect("/booking/invoice");
};