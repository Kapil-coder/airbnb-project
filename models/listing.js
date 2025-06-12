const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review= require("./reviews.js");
const { types, ref } = require("joi");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url:String,
        filename:String,
  },
    price: Number,
    location: String,
    country: String,
    review:[
      {
        type: Schema.Types.ObjectId,
        ref :"Review"
      }
  ],
  owner :{
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  category :{
       type : String,
       enum:["Trending","Rooms","Iconic Cities","Surfing", "Farms","Mountains","Camping","Beach","Clubs","Dome","Boats"]
  },
  discountedPrice: Number,
  badge: {
  type: String,
  enum: ["new", "discount", "trending", null],
  default: null,
},
});

listingSchema.post("findOneAndDelete", async(listing)=>{
  if(listing){
    await Review.deleteMany({_id:{$in : listing.review}});
  }
}
);

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
