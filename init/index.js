const mongoose= require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL= "mongodb://127.0.0.1:27017/wandernest"

async function main() {
  await mongoose.connect(MONGO_URL);
}

main().then(()=>{
    console.log("Connected to db");
}).catch(err => console.log(err));

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data= initData.data.map((obj)=>({...obj, owner : "68400495f49e2e6f94aa5fbf"}))
    await Listing.insertMany(initData.data);
    console.log("Data added");
};

initDB();