const mongoose = require("mongoose");

const SchemaAdmin = mongoose.Schema({
  AdminName: {
    type: String,
    require: true,
  },
  AdminEmail: {
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

module.exports = mongoose.model("AdminCredentials", SchemaAdmin);
