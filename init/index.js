require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });


const mongoose= require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const dbUrl= process.env.MONGO_URL;

async function main() {
  await mongoose.connect(dbUrl);
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