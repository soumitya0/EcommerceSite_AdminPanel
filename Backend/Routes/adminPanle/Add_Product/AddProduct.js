const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const MiddleWare_Auth = require("../../../middleWare/auth");
const SchemaProduct = require("../../../Models/Admin_Panel/ProductSchema/SchemaProduct");

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

// @Api         POST /api/addproduct
// @dec         Add Product
// access       Private
router.post(
  "/",
  [
    uploads.any(),
    MiddleWare_Auth,
    [
      check("productName", "product Name required").not().isEmpty(),
      check("productDescrption", "product Descrption requires").not().isEmpty(),
      check("productCategory", "product Category requires").not().isEmpty(),
      check("productPrice", "product Price requires").not().isEmpty(),
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

    const {
      productName,
      productDescrption,
      productCategory,
      productWeight,
      productPrice,
      productMaxSellingWeight,
      stock,
    } = req.body;

    try {
      const newProduct = new SchemaProduct({
        productName: productName,
        productDescrption: productDescrption,
        productCategory: productCategory,
        productWeight: productWeight,
        productPrice: productPrice,
        productMaxSellingWeight: productMaxSellingWeight,
        stock: stock,
        productImage: req.files[0].filename,
      });
      const contact = await newProduct.save();
      res.json(contact);
    } catch (error) {
      console.error(error.message);
    }
  },
);

module.exports = router;
