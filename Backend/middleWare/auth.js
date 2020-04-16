const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //get the token from header
  const token = req.header("x-auth-token"); // key

  //check if not token
  if (!token) {
    return res.status(401).json({ msg: "no token authorization denied" });
  }

  try {
    // verify the token
    const decoded = jwt.verify(token, config.get("jwtSecret")); // payload will be put in decoded

    req.Admin_user = decoded.Admin_user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "token is not valid" });
  }
};
