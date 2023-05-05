const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomtype: {
    type: String,
    required: true
  },
  acreage: {
    type: String,
    required: true
  },
  roomprice: {
    type: String,
    required: true
  },
  roomconvenient: {
    type: [String],
    required: true,
  },
  imgRoom: {
    type: String,
    required: true,
  },
  maxPeople: {
    type: Number,
    required: true,
  },
  roomNumbers: {
    type: Number,
  },
  booked: {
    type: Boolean,
    default: false,
  },
  bookings: {
    type:[String]
  }
})

module.exports = mongoose.model("Room", roomSchema);