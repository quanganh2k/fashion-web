const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Access token not found" });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log("error",err)
      if (err) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid authentication" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = auth;
