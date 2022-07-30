const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require(`../controlers/variables`);


module.exports = function (req, res, next) {
  // get token
  const token = req.header("Authorization").split(" ")[1];
  console.log(token)
  if (!token) return res.status(400).json({ message: "Access Denied .Please Login" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};