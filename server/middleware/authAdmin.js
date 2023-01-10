const Account = require("../models/Account");

const authAdmin = async (req, res, next) => {
  try {
    const user = await Account.findOne({ _id: req.user.id });
    if (user.role === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Admin resources access denied" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = authAdmin;
