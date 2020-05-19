const express = require("express");

const router = express.Router();

// schema
const SchemaOrder = require("../../../Models/client/Order/SchemaOrder");

// schema
const SchemaUser = require("../../../Models/client/UserSchema/SchemaUser");

const MiddleWare_User = require("../../../middleWare/UserAuth");

// Express Validator
const { check, validationResult } = require("express-validator");

//bcrypt

const bcrypt = require("bcryptjs");

//jwt
const jwt = require("jsonwebtoken");

//config
const config = require("config");

//@Api            POST  /api/user
//@dec            user Register for One user their will be not Register Form  For login in ui
//@access         public
router.post(
  "/",
  [
    check("UserName", "Please add Name").not().isEmpty(),
    check("UserEmail", "Please add Email").isEmail(),
    check("password", "Please Add Password with 6+ characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { UserName, UserEmail, password } = req.body;

    try {
      let user = await SchemaUser.findOne({ UserEmail: UserEmail });

      if (user) {
        return res.status(400).json({ msg: "user Exist" });
      }

      //i have add only this Caredebtails as user
      user = new SchemaUser({
        UserName: UserName,
        UserEmail: UserEmail,
        password: password,
      });

      //bcrypt
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //JWT Token
      const PayLoad = {
        user: {
          id: user.id,
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

//@API          Post api/user/login
//@Des          login user
//access        public
router.post(
  "/login",
  [
    check("UserEmail", "Please Add Emial-id").isEmail(),
    check("password", "Please Add Password ").exists(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { UserEmail, password } = req.body;

    try {
      let user = await SchemaUser.findOne({ UserEmail });

      //checking email
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentails email " });
      }

      //checking password
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({ msg: "Invalid Credentails password " });
      }

      //JWT Token
      const PayLoad = {
        user: {
          id: user.id,
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

//@API          /api/user
//@Desc         Logged User
//Access        Private

router.get("/", MiddleWare_User, async (req, res) => {
  try {
    const UserDetails = await SchemaUser.findById(req.user.id).select(
      "-password",
    );
    res.json(UserDetails);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@API          /api/user/myorder
//@Desc         getting user Order
//Access        Private

router.get("/myorder", MiddleWare_User, async (req, res) => {
  try {
    const UserDetails = await SchemaOrder.find({ userId: req.user.id });
    res.json(UserDetails);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
