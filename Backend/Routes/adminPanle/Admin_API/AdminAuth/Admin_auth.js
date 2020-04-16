const express = require("express");
const router = express.Router();

//Express Valitaion
const { check, validationResult } = require("express-validator");

//schema
const SchemaAdmin = require("../../../../Models/Admin_Panel/AdminSchema/SchemaAdmin");

//bycrypt
const bcrypt = require("bcryptjs");

//JWT
const JWT = require("jsonwebtoken");
const config = require("config");

//middleware
const auth = require("../../../../middleWare/auth");

//  @route        GET /api/authadmin
//  @dec          Logged in  admin  (Getting the current logged in user)
//  @access       Private
router.get("/", auth, async (req, res) => {
  try {
    const userAdmin = await SchemaAdmin.findById(req.Admin_user.id).select(
      "-password",
    ); // req.Admin_user.id contain id from the token that is passed by the middleware
    //select('-password') here we don't want to return the password

    res.json(userAdmin);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

//  @route        POST /api/authadmin
//  @dec          Logged in  admin
//  @access       Private
router.post(
  "/",
  [
    check("email", "Please Include Valid Email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let AdminUser = await SchemaAdmin.findOne({ email });

      console.log(AdminUser);

      //checking email
      if (!AdminUser) {
        return res.status(400).json({ msg: "Invalid Credentails email" });
      }

      //checking Password
      const isPasswordMatch = await bcrypt.compare(
        password,
        AdminUser.password,
      );

      if (!isPasswordMatch) {
        return res.status(400).json({ msg: "Invalid Credentails" });
      }

      const PAYLOAD = {
        Admin_user: {
          id: AdminUser.id, // we are send in payload only the id
        },
      };

      JWT.sign(
        PAYLOAD,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        },
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server Error");
    }
  },
);

module.exports = router;
