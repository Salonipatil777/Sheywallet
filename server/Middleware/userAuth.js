const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.body.userID = decoded.userID;
    next();
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};
