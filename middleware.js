const Listing = require("./models/listing.js");
const Review = require("./models/reviews.js");
module.exports.isLoggedIn = (req,res, next)=>{
   if(! req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in to create a listing!");
         return res.redirect("/login");
    } 
    next();
}

module.exports.saveUrl =(req,res,next)=>{
     if(req.session.redirectUrl){
          res.locals.redirectUrl= req.session.redirectUrl;

     }
     next();
};

module.exports.isOwner= async(req,res,next)=>{
      let{id}= req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.CurrentUser._id)){
        req.flash("error","You are not owner of this listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.isReviewAuthor= async(req,res,next)=>{
      let{reviewId,id}= req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.CurrentUser._id)){
        req.flash("error","You are not author of this review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};
