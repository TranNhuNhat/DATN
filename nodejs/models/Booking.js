const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
      code: {
        type:String,
        required: true
      }, 
      roomtype: {
        type:String,
        required: true
      },
      guestname: {
        type:String,
        required: true
      },
      gender: {
        type:String,
        required: true
      },
      bookingphone: {
        type:String,
        required: true
      },
      email: {
        type:String,
        required: true
      },
      bookingdate: {
        type:Date,
        required: true,
        // default: Date.now,
      },
      checkindate: {
        type:Date,
        required: true
      },
      checkoutdate: {
        type:Date,
        required: true
      },
      numadults: {
        type:String,
        required: true
      },
      numchildren: {
        type:String,
        required: true
      },
})

module.exports = mongoose.model("Booking",bookingSchema);