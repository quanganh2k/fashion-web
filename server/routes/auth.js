const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const Account = require("../models/Account");
const auth = require("../middleware/auth");

//! API Register
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing information" });
    }
    const user = await Account.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password is at least 8 characters long",
      });
    }
    const hashedPassword = await argon2.hash(password);
    const newUser = new Account({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // const accessToken = createAccessToken({ id: newUser._id });
    // const refreshToken = createRefreshToken({ id: newUser._id });

    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   path: "/api/auth/refresh_token",
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    // });

    const plainUser = newUser.toJSON();
    delete plainUser.password;

    res.json({
      success: true,
      message: "Register successfully",
      user: plainUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//! API Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing information" });
    }
    const user = await Account.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });
    }
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });
    }
    const accessToken = createAccessToken({ id: user._id });
    const refreshToken = createRefreshToken({ id: user._id });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // path: "/api/auth/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days,
      // sameSite: "none",
      // secure: false
    });

    const plainUser = user.toJSON();
    delete plainUser.password;

    res.json({
      success: true,
      message: "Login successfully",
      accessToken,
      user: plainUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

//! API Logout
router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("refreshToken", { httpOnly: true });
    res.json({ success: true, message: "Logged out" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//! API GET refresh token
router.get("/refresh_token", (req, res) => {
  try {
    const rfToken = req.cookies.refreshToken;
    if (!rfToken) {
      return res
        .status(400)
        .json({ success: false, message: "Please login or register" });
    }
    jwt.verify(rfToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, message: "Please login or register" });
      }

      const accessToken = createAccessToken({ id: user.id });

      res.json({ success: true, accessToken });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

//! API get user information
router.get("/user_info", auth, async (req, res) => {
  try {
    const user = await Account.findById(req.user.id).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }
    res.json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = router;
