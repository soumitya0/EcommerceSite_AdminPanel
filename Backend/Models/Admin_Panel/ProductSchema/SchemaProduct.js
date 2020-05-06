const mongoose = require("mongoose");

const SchemaProduct = mongoose.Schema({
  productName: {
    type: String,
    require: true,
  },

  productDescrption: {
    type: String,
    require: true,
  },

  productImage: {
    type: String,
  },

  productCategory: {
    type: String,
    require: true,
  },

  productWeight: {
    type: String,
  },
  productPrice: {
    type: String,
    require: true,
  },
  productMaxSellingWeight: {
    type: String,
  },
  stock: {
    type: String,
    require: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", SchemaProduct);
