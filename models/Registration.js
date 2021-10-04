const mongoose = require("mongoose");

const RegistrationSchema = mongoose.Schema({
  user_type: String,
  fname: String,
  lname: String,
  email: String,
  password: String,
  address: String,
  dob: Date,
  postal: Number,
  contact: Number,
  company: String,
  created_at: Date,
  updated_at: Date,
  country: {},
  month: Number,
});

module.exports = mongoose.model("Registration", RegistrationSchema);
