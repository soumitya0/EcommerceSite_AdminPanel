const express = require("express");
const router = express.Router();

//  @route        GET /api/authadmin
//  @dec          Logged in  admin
//  @access       Private
router.get("/", (req, res) => {
  res.send("Logged Admin");
});

//  @route        POST /api/authadmin
//  @dec          Logged in  admin
//  @access       Private
router.post("/", (req, res) => {
  res.send("Login Admin");
});

module.exports = router;
