const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const MiddleWare_Auth = require("../../../middleWare/auth");
const SchemaProduct = require("../../../Models/Admin_Panel/ProductSchema/SchemaProduct");

// @Api         PUT /api/stock
// @dec         Edit stock of Product
// access       private

router.put("/:id", MiddleWare_Auth, async (req, res) => {
  try {
    await SchemaProduct.findByIdAndUpdate({ _id: req.params.id }, req.body);

    res.send({
      message: "success",
      Update: "1",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});
module.exports = router;
