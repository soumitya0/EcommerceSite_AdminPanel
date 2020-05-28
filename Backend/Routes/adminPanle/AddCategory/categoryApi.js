const express = require("express");
const router = express.Router();
const SchemaCategory = require("../../../Models/Admin_Panel/categorySchema/SchemaCategory");
const MiddleWare_Auth = require("../../../middleWare/auth");
const { check, validationResult } = require("express-validator");

const SchemaProduct = require("../../../Models/Admin_Panel/ProductSchema/SchemaProduct");

// @Api         POST /api/category
// @dec         Add Category
// access       Private
router.post(
  "/",
  [
    MiddleWare_Auth,
    [check("Categoryname", "Add Category Name").not().isEmpty()],
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    //res.json(req.body);

    const { Categoryname } = req.body;

    try {
      let CategoryItemName = await SchemaCategory.findOne({
        Categoryname: Categoryname,
      });

      if (CategoryItemName) {
        res.status(400).json({ msg: "Category Exist" });
      }

      CategoryItemName = new SchemaCategory({
        Categoryname: Categoryname,
      });

      await CategoryItemName.save();
      res.send("Category Added");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },
);

// @Api         GET /api/category/
// @dec         getting all Category
// access       public

router.get("/", async (req, res) => {
  try {
    const data = await SchemaCategory.find({});
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

// @Api         DELETE /api/category/
// @dec         Deleting  Category
// access       private

router.delete("/:id", MiddleWare_Auth, async (req, res) => {
  try {
    const result = await SchemaCategory.findByIdAndRemove({
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

// @Api         GET /api/category/:categoryName
// @dec         getting category name
// access       public

router.get("/:categoryName", async (req, res) => {
  try {
    const data = await SchemaProduct.find({
      productCategory: req.params.categoryName,
    });

    if (!data) {
      return res.status(400).json({ msg: "category Not Found " });
    } else {
      res.json(data);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
