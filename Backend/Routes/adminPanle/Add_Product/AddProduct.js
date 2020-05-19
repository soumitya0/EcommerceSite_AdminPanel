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

    const {
      productName,
      productDescrption,
      productCategory,
      productWeight,
      productPrice,
      productMaxSellingWeight,
      priceWithWeight,
      stock,
    } = req.body;

    try {
      const newProduct = new SchemaProduct({
        productName: productName,
        productDescrption: productDescrption,
        productCategory: productCategory,
        productWeight: productWeight,
        productPrice: productPrice,
        priceWithWeight: priceWithWeight,
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

// @Api         GET /api/addproduct
// @dec         getting all Product
// access       private
router.get("/", MiddleWare_Auth, async (req, res) => {
  try {
    const data = await SchemaProduct.find({});
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

// @Api         DELETE /api/addproduct/:id
// @dec         Deleting  Product by id
// access       private
router.delete("/:id", MiddleWare_Auth, async (req, res) => {
  try {
    const result = await SchemaProduct.findByIdAndDelete({
      _id: req.params.id,
    });
    console.log(req.params.id);

    if (result) {
      res.send({
        message: " delete success",
        deletedCount: "1",
      });
    } else {
      res.send({
        message: "Id not found ",
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error ");
  }
});

// @Api         GET /api/addproduct
// @dec         getting all Product
// access       private
router.get("/data", async (req, res) => {
  try {
    const data = await SchemaProduct.find({});
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

// @Api         GET /api/addproduct/:id
// @dec         getting by Product
// access       public
router.get("/:id", async (req, res) => {
  try {
    const data = await SchemaProduct.findById(req.params.id);

    if (!data) {
      return res.status(400).json({ msg: "Product Not Found " });
    } else {
      res.json(data);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
