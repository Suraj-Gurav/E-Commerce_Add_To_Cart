
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    item:String,
    title:String,
    image:String,
    price:Number
});

module.exports = mongoose.model("product",userSchema);//user=collection name