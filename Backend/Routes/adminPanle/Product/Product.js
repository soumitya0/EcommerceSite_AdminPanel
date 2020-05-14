const express = require("express");

const router = express.Router();

const SchemaProduct = require("../../../Models/Admin_Panel/ProductSchema/SchemaProduct");

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

module.exports = router;
