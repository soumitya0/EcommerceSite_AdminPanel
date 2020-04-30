const mongoose = require("mongoose");

const SchemaCategory = mongoose.Schema({
  Categoryname: {
    type: String,
    unique: true,
    require,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ProductCategory", SchemaCategory);
