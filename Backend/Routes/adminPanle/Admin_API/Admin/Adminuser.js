const express = require("express");
const router = express.Router();

//express validator
const { check, validationResult } = require("express-validator");

//  @route        POST api/admin
//  @dec          Register Admin
//  @access       Public

//schema
const SchemaAdmin = require("../../../../Models/Admin_Panel/AdminSchema/SchemaAdmin");

////bycrypt
const bcrypt = require("bcryptjs");

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

    // res.send("pass");

    //destructring pulling out the name id and password from body
    const { name, email, password } = req.body;

    //with the user with same email then we will return Error
    try {
      let Adminuser = await SchemaAdmin.findOne({ email: email });

      if (Adminuser) {
        return res.status(400).json({ msg: "Admin Existes" });
      }

      Adminuser = new SchemaAdmin({
        name: name,
        email: email,
        password: password,
      });

      const salt = await bcrypt.genSalt(10);

      Adminuser.password = await bcrypt.hash(password, salt);

      await Adminuser.save(); // save to dataBase

      res.send(" Admin_user saved ");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server Error");
    }
  },
);

module.exports = router;
