const mongoose = require("mongoose");

const SchemaOrder = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  UserName: {
    type: String,
    require: true,
  },

  ReciverName: {
    type: String,
    require: true,
  },

  ReciverAddress: {
    type: String,
    require: true,
  },

  FullAddress: {
    type: String,
    require: true,
  },

  ProductName: {
    type: String,
    require: true,
  },
  ProductId: {
    type: String,
    require: true,
  },
  ProductCategory: {
    type: String,
    require: true,
  },

  ProductPrice: {
    type: String,
    require: true,
  },

  PaymentRequestId: {
    type: String,
    require: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("order", SchemaOrder);
