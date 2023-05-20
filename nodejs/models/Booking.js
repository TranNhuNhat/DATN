const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
      name: {
        type:String,
        required: true
      }, 
      roomtype: {
        type:String,
        required: true
      },
      roomNumbers: {
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
      },
      checkindate: {
        type:Date,
      },
      checkoutdate: {
        type:Date,
      },
      numadults: {
        type:Number,
      },
      numchildren: {
        type:Number,
      },
      approved : {
        type: Boolean,
        default:false,
      },
})

module.exports = mongoose.model("Booking",bookingSchema);