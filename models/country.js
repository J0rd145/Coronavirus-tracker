let mongoose = require("mongoose");

let countrySchema = mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  confirmed: {
    type: String,
    required: true,
  },
  recovered: {
    type: String,
    required: true,
  },
  critical: {
    type: String,
    required: true,
  },
  deaths: {
    type: String,
    required: true,
  },
  lastUpdate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  code: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: false,
    default: 0,
  },
  lng: {
    type: Number,
    required: false,
    default: 0,
  },
});

module.exports = mongoose.model("country", countrySchema);
