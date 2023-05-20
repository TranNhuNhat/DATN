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
      phone: {
        type:String,
        required: true
      },
      distance: {
        type:Number,
        required: true
      },
      rating: {
        type:Number,
        required: true,
        min: 0,
        max: 5,
      },
      desc:{
        type: String,
        required:true
      },
      img: {
        type:String,
       
      },
      img1: {
        type:String,
       
      },
      img2: {
        type:String,
       
      },
      img3: {
        type:String,
        
      },
      img4: {
        type:String,
       
      },
      cheapestPrice: {
        type: String,
        
      },
      rooms: {
        type: [String]
      },
      evaluates: {
        type: [String]
      }
})

module.exports = mongoose.model("Homestay",homestaySchema);