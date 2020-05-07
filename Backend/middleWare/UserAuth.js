const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Getting Header
  const token = req.header("X-Auth-Token");
  console.log(token);

  if (!token) {
    return res.status(400).json({ msg: " No Token Autherization Denied" });
  }

  //if we get the token then verfiy
  try {
    const decode = jwt.verify(token, config.get("jwtSecret")); // this is just a Payload

    console.log(decode.Admin, "Soumity");
    req.user = decode.user; //creating a objct in req with user

    console.log("middle ware");
    console.log(req.user.id);

    next();
  } catch (error) {
    res.status(401).json({ msg: "tokin is not Vaild" });
  }
};
