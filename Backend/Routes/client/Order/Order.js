const express = require("express");

const router = express.Router();

// schema
const SchemaOrder = require("../../../Models/client/Order/SchemaOrder");

//MiddleWare
const MiddleWare_Auth = require("../../../middleWare/UserAuth");

// Express Validator
const { check, validationResult } = require("express-validator");

//bcrypt

const bcrypt = require("bcryptjs");

//jwt
const jwt = require("jsonwebtoken");

//config
const config = require("config");

//@Api            POST  /api/order
//@dec            having the order
//@access         private

router.post(
  "/",
  [
    MiddleWare_Auth,
    [
      check("UserName", "UserName requires").not().isEmpty(),

      check("ReciverName", "ReciverName requires").not().isEmpty(),
      check("ReciverPhone", "ReciverPhone requires").not().isEmpty(),
      check("ReciverHouseNo", "ReciverHouseNo requires").not().isEmpty(),
      check("ReciverSector", "ReciverSector requires").not().isEmpty(),
      check("FullAddress", "FullAddress requires").not().isEmpty(),

      check("ProductName", "ProductName requires").not().isEmpty(),
      check("ProductId", "ProductId requires").not().isEmpty(),
      check("ProductCategory", "ProductCategory requires").not().isEmpty(),
      check("ProductPrice", "ProductPrice requires").not().isEmpty(),
      check("PaymentRequestId", "PaymentRequestId requires").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      UserName,

      ReciverName,
      ReciverPhone,
      ReciverHouseNo,
      ReciverSector,
      FullAddress,

      ProductName,
      ProductId,
      ProductCategory,
      ProductPrice,

      PaymentRequestId,
      instaMojoOrderDetails,
    } = req.body;

    try {
      const order = new SchemaOrder({
        userId: req.user.id,
        UserName: UserName,

        ReciverName: ReciverName,
        ReciverPhone: ReciverPhone,
        ReciverHouseNo: ReciverHouseNo,
        ReciverSector: ReciverSector,

        FullAddress: FullAddress,

        ProductName: ProductName,
        ProductId: ProductId,
        ProductCategory: ProductCategory,
        ProductPrice: ProductPrice,

        PaymentRequestId: PaymentRequestId,
        instaMojoOrderDetails: instaMojoOrderDetails,
        orderStatus: "pending",
      });

      const orderData = await order.save();
      res.json(orderData);
    } catch (error) {
      console.error(error.message);
    }
  },
);

module.exports = router;
