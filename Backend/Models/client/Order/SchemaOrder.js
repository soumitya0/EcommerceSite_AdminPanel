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

  ReciverPhone: {
    type: Number,
    require: true,
  },

  ReciverHouseNo: {
    type: Number,
    require: true,
  },

  ReciverSector: {
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

  instaMojoOrderDetails: {
    type: Object,
  },
  orderStatus: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("order", SchemaOrder);
