const express = require("express");
const router = express.Router();
const SchemaCategory = require("../../../Models/Admin_Panel/categorySchema/SchemaCategory");
const MiddleWare_Auth = require("../../../middleWare/auth");
const { check, validationResult } = require("express-validator");

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

module.exports = router;
