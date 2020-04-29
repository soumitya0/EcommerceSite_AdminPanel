const express = require("express");

const router = express.Router();

// schema
const SchemaAdmin = require("../../../Models/Admin_Panel/AdminSchema/SchemaAdmin");

const MiddleWare_Auth = require("../../../middleWare/auth");

// Express Validator
const { check, validationResult } = require("express-validator");

//bcrypt

const bcrypt = require("bcryptjs");

//jwt
const jwt = require("jsonwebtoken");

//config
const config = require("config");

//@Api            POST  /api/admin
//@dec            Admin Register for One Admin their will be not Register Form  For login in ui
//@access         public
router.post(
  "/",
  [
    check("AdminName", "Please add Name").not().isEmpty(),
    check("AdminEmail", "Please add Email").isEmail(),
    check("password", "Please Add Password with 6+ characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { AdminName, AdminEmail, password } = req.body;

    try {
      let Admin = await SchemaAdmin.findOne({ AdminEmail: AdminEmail });

      if (Admin) {
        return res.status(400).json({ msg: "Admin Exist" });
      }

      //i have add only this Caredebtails as admin
      Admin = new SchemaAdmin({
        AdminName: "Admin",
        AdminEmail: "Admin@gmail.com",
        password: "123456",
      });

      //bcrypt
      const salt = await bcrypt.genSalt(10);
      Admin.password = await bcrypt.hash(password, salt);

      await Admin.save();

      //JWT Token
      const PayLoad = {
        Admin: {
          id: Admin.id,
        },
      };

      jwt.sign(
        PayLoad,
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
      res.status(500).send("Server Error");
    }
  },
);

//@API          Post api/admin/login
//@Des          login Admin
//access        public
router.post(
  "/login",
  [
    check("AdminEmail", "Please Add Emial-id").isEmail(),
    check("password", "Please Add Password ").exists(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { AdminEmail, password } = req.body;

    try {
      let Admin = await SchemaAdmin.findOne({ AdminEmail });

      //checking email
      if (!Admin) {
        return res.status(400).json({ msg: "Invalid Credentails email " });
      }

      //checking password
      const isPasswordMatch = await bcrypt.compare(password, Admin.password);
      if (!isPasswordMatch) {
        return res.status(400).json({ msg: "Invalid Credentails password " });
      }

      //JWT Token
      const PayLoad = {
        Admin: {
          id: Admin.id,
        },
      };

      jwt.sign(
        PayLoad,
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
      res.status(500).json({ msg: "server error" });
    }
  },
);

//@API          /api/admin
//@Desc         Logged User
//Access        Private

router.get("/", MiddleWare_Auth, async (req, res) => {
  try {
    const AdminDetails = await SchemaAdmin.findById(req.Admin.id).select(
      "-password",
    );
    res.json(AdminDetails);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
