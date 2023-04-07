const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
      code: {
        type:String,
        required: true
      }, 
      roomtype: {
        type:String,
        required: true
      },   
})

module.exports = mongoose.model("Room",roomSchema);