const mongoose = require("mongoose");

const roomtypeSchema = new mongoose.Schema({ 
      code: {
        type:String,
        required: true
      },
      name: {
        type:String,
        required: true
      },
      roomtype: {
        type:String,
        required: true
      },
      roomprice: {
        type:String,
        required: true
      },
      roomdesc: {
        type:String,
        required: true
      },
})

module.exports = mongoose.model("Roomtype",roomtypeSchema);