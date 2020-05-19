const express = require("express");

const router = express.Router();

// schema
const SchemaOrder = require("../../../Models/client/Order/SchemaOrder");

//MiddleWare
const MiddleWare_Auth = require("../../../middleWare/UserAuth");

const MiddleWare_Admin = require("../../../middleWare/auth");

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

//@Api            GET  /api/order
//@dec            Getting  all order
//@access         private
router.get("/", MiddleWare_Admin, async (req, res) => {
  try {
    const data = await SchemaOrder.find({});
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@Api            PUT  /api/order/:id
//@dec            UPDATING orderStatus pending - onway - delivered
//@access         private

router.put("/:id", MiddleWare_Admin, async (req, res) => {
  try {
    await SchemaOrder.findByIdAndUpdate({ _id: req.params.id }, req.body);

    res.send({
      message: "success",
      Update: "1",
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).send("Server Error");
  }
});

//@Api            get  /api/order/pending/data
//@dec            getting  pending order
//@access         private
router.get("/pending/data", MiddleWare_Admin, async (req, res) => {
  try {
    const data = await SchemaOrder.find({ orderStatus: "pending" });
    if (!data) {
      return res.send(400).json({ msg: "pending order  Not Found " });
    } else {
      res.json(data);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

//@Api            get  /api/order/oway/data
//@dec            getting  pending order
//@access         private
router.get("/onway/data", MiddleWare_Admin, async (req, res) => {
  try {
    const data = await SchemaOrder.find({ orderStatus: "onWay" });
    if (!data) {
      return res.send(400).json({ msg: "onWay order  Not Found " });
    } else {
      res.json(data);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

//@Api            get  /api/order/delivered/data
//@dec            getting  pending order
//@access         private
router.get("/delivered/data", MiddleWare_Admin, async (req, res) => {
  try {
    const data = await SchemaOrder.find({ orderStatus: "delivered" });
    if (!data) {
      return res.send(400).json({ msg: "delivered order  Not Found " });
    } else {
      res.json(data);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
