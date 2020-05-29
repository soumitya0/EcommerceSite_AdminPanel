const express = require("express");

const router = express.Router();

const SchemaProduct = require("../../../Models/Admin_Panel/ProductSchema/SchemaProduct");

const { check, validationResult } = require("express-validator");

const MiddleWare_Auth = require("../../../middleWare/auth");

const path = require("path");
const fs = require("fs");

const multer = require("../../../Multer/multer");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// @Api         GET api/product/stock/available
// @dec         Display Stock AVALIABLE product
// access       Public
router.get("/stock/available", async (req, res) => {
  try {
    const data = await SchemaProduct.find({ stock: "Avaliable" });

    if (!data) {
      return res.send(400).json({ msg: "No Product are Avaliable now" });
    } else {
      res.json(data);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

// @Api         GET api/product/stock/OutofStock
// @dec         Display Stock OutofStock product
// access       Public
router.get("/stock/OutofStock", async (req, res) => {
  try {
    const data = await SchemaProduct.find({ stock: "OutofStock" });
    if (!data) {
      return res.send(400).json({ msg: "No Product are Avaliable now" });
    } else {
      res.json(data);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dx7a4fyl4",
  api_key: "771857265828892",
  api_secret: "TDoD_GGmItL18YyXreHbX-AetdM",
});
// @Api         PUT api/product/editProduct/:id
// @dec         Edit Product
// access       Private
router.put(
  "/editProduct/:id",
  [
    multer.single("image"),
    MiddleWare_Auth,
    [
      check("productName", "product Name required").not().isEmpty(),
      check("productDescrption", "product Descrption requires").not().isEmpty(),
      check("productCategory", "product Category requires").not().isEmpty(),
      check("productPrice", "product Price requires").not().isEmpty(),
      check("priceWithWeight", "product Price requires").not().isEmpty(),
      check("stock", "stock  requires").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    console.log("Add Product"); //form fields
    console.log("req.body"); //form fields
    console.log(req.body);
    console.log("req.file");
    console.log(req.file); //form files

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body;
    const productName = body.productName;
    const productDescrption = body.productDescrption;
    const productCategory = body.productCategory;

    const productWeight = body.productWeight;
    const productPrice = body.productPrice;
    const productMaxSellingWeight = body.productMaxSellingWeight;

    const priceWithWeight = body.priceWithWeight;
    const stock = body.stock;

    const updates = {
      productName,
      productDescrption,
      productCategory,
      productWeight,
      productPrice,
      productMaxSellingWeight,
      priceWithWeight,
      stock,
    };

    const result = await cloudinary.uploader.upload(req.file.path);

    if (req.file) {
      const productImage = result.secure_url;
      console.log(productImage, "IMAGE");
      updates.productImage = productImage;
    }

    console.log(req.body, "API");

    try {
      await SchemaProduct.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: updates,
        },
        {
          new: true,
        },
      );
      res.send({
        message: "success",
        Update: "1",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  },
);

module.exports = router;
