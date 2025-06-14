const Listing = require("../models/listing.js");

module.exports.Index = async (req, res, next) => {
  const { category, deal } = req.query;
  let allListings;

  if (deal === "today") {
    // Filter listings where discountedPrice exists and is less than price
    allListings = await Listing.find({
      discountedPrice: { $exists: true, $ne: null },
      $expr: { $lt: ["$discountedPrice", "$price"] }
    });
  } else if (category) {
    allListings = await Listing.find({ category });
  } else {
    allListings = await Listing.find({});
  }

  const categories = Listing.schema.path("category").enumValues;

  res.render("listings/index", {
    allListings,
    selectedCategory: category || "",
    categories,
  });
};


module.exports.RenderForm = (req, res) => {
  const categories = Listing.schema.path("category").enumValues;
  res.render("listings/new.ejs", { categories });
};

module.exports.ShowListing = async (req, res) => {
  let { id } = req.params;
  id = id.trim();
  const listing = await Listing.findById(id)
    .populate({
      path: "review",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  }
   return res.render("listings/show", { listing });
};

module.exports.CreateListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  let data = req.body.listing;
  const newListing = new Listing(data);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  //Discount logic
  if (data.discountedPrice && data.discountedPrice < data.price) {
    newListing.badge = "discount";
  } else {
    newListing.badge = null;
  }
  await newListing.save();
  req.flash("success", "New Listing Created");
  res.redirect("/listings");
};
module.exports.EditListing = async (req, res) => {
  let { id } = req.params;
  id = id.trim();
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
     return res.redirect("/listings");
  }
  const categories = Listing.schema.path("category").enumValues;

  res.render("listings/edit.ejs", { listing, categories });
};

module.exports.UpdateListing = async (req, res, next) => {
  let { id } = req.params;
  let data= req.body.listing;
  let listing = await Listing.findByIdAndUpdate(id, { ...data });
  //discount logic
  if (data.discountedPrice && data.discountedPrice < data.price) {
    listing.badge = "discount";
  } else {
    listing.badge = null;
  }
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", " Listing Updated");

  res.redirect(`/listings/${id}`);
};

module.exports.DestroyListing = async (req, res) => {
  let { id } = req.params;
  let deleteListing = await Listing.findByIdAndDelete(id);
  req.flash("success", " Listing Deleted");
  res.redirect("/listings");
};
