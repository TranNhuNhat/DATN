const mongoose = require("mongoose");

const homestaySchema = new mongoose.Schema({
    code: {
        type:String,
        required: true
      }, 
      name: {
        type:String,
        required: true
      },
      address: {
        type:String,
        required: true
      },
      district: {
        type:String,
        required: true
      },
      numroom: {
        type:Number,
        required: true
      },
      rating: {
        type:Number,
        required: true
      },
      img: {
        type:String,
        required: true
      }
})

module.exports = mongoose.model("Homestay",homestaySchema);