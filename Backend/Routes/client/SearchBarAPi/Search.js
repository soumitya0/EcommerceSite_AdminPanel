const express = require("express");
const router = express.Router();
const SchemaProduct = require("../../../Models/Admin_Panel/ProductSchema/SchemaProduct");

router.get("/:find", async (req, res) => {
  try {
    const data = await SchemaProduct.find({ productName: req.params.find });

    if (!data) {
      return res.send(400).json({ msg: "Product Not Found " });
    } else {
      res.json(data);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
