const express = require("express");
const router = express.Router();

//  @route        POST api/admin
//  @dec          Register Admin
//  @access       Public
router.post("/", (req, res) => {
  res.send("Register Admin");
});

module.exports = router;
