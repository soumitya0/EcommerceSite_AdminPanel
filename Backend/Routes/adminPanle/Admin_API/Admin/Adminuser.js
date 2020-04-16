const express = require("express");
const router = express.Router();

//express validator
const { check, validationResult } = require("express-validator");

//  @route        POST api/admin
//  @dec          Register Admin
//  @access       Public
router.post(
  "/",
  [
    check("name", "Please add Name").not().isEmpty(),
    check("email", "Please include a valid email ").isEmail(),
    check("password", "Please enter a password with 6+ character").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    //
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    res.send("pass");
  },
);

module.exports = router;
