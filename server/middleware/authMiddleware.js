const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "دسترسی غیر مجاز",
      });
    }

    const decoded = jwt.verify(token, "mySecretKey");

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      message: "توکن معتبر نیست",
    });
  }
};

module.exports = protect;
