const express = require("express");

const router = express.Router();

const SchemaProduct = require("../../../Models/Admin_Panel/ProductSchema/SchemaProduct");

const { check, validationResult } = require("express-validator");

const MiddleWare_Auth = require("../../../middleWare/auth");

const multer = require("multer");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const dir = "../client/myapp/public/uploads";

var uploads = multer({
  storage: multer.diskStorage({
    destination: function (req, res, cb) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      cb(null, "../client/myapp/public/uploads");
    },

    filename: function (req, file, callback) {
      callback(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname), // use to have image-824722.jpg
      );
    },
  }),

  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(/*res.end('Only images are allowed')*/ null, false);
    }
    cb(null, true);
  },
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(express.static("uploads"));

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

// @Api         PUT api/product/editProduct/:id
// @dec         Edit Product
// access       Private
router.put(
  "/editProduct/:id",
  [
    uploads.any(),
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
    console.log(req.files); //form files

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

    if (req.files) {
      const productImage = req.files[0].filename;
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
