const mongoose = require("mongoose");

const evaluateSchema = new mongoose.Schema({
  homestayname: {
    type: String,
  },
  customername: {
    type: String,
    required: true
  },
  roomtype: {
    type: String,
    required: true
  },
  evaluatedate: {
    type: Date,
  },
  comment: {
    type: String,
  },
  service: {
    type: String,
  },
  point: {
    type: Number,
    required: true,
  },
  customers: {
    type: String,
  },
  approved: {
    type: Boolean,
    default:false,
  }
})

module.exports = mongoose.model("Evaluate", evaluateSchema);