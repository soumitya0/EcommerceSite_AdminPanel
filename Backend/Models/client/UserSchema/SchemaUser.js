const mongoose = require("mongoose");

const SchemaUser = mongoose.Schema({
  UserName: {
    type: String,
    require: true,
  },
  UserEmail: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("UserCredentials", SchemaUser);
