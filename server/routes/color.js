const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const Color = require("../models/Color");
const Product = require("../models/Product");

//! API get all colors
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const colorName = req.query.search;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    const filters = {};
    if (colorName) {
      filters.colorName = { $regex: colorName, $options: "i" };
    }

    const allData = await Color.find(filters).exec();

    let total = 0;
    for (const obj of allData) {
      if (obj) {
        total++;
      }
    }

    if (endIndex < total) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.page = page;
    results.totalData = total;
    results.pageCount = Math.ceil(total / limit);
    results.data = await Color.find(filters)
      .limit(limit)
      .skip(startIndex)
      .exec();

    res.json({ success: true, results: results });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//! API get color details
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const color = await Color.findById(id);
    res.json({ success: true, color });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//! API create color
router.post("/", auth, authAdmin, async (req, res) => {
  try {
    const { colorName } = req.body;
    if (!colorName) {
      return res
        .status(400)
        .json({ success: false, message: "You need to fill full information" });
    }
    const color = await Color.findOne({ colorName });
    if (color) {
      return res
        .status(400)
        .json({ success: false, message: "Color name already exists" });
    }
    const newColor = new Color({ colorName });
    await newColor.save();
    res.json({
      success: true,
      message: "Create successfully",
      color: newColor,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//! API update color
router.put("/:id", auth, authAdmin, async (req, res) => {
  try {
    const { colorName } = req.body;
    if (!colorName) {
      return res
        .status(400)
        .json({ success: false, message: "You need to fill full information" });
    }

    const updatedColor = await Color.findByIdAndUpdate(
      { _id: req.params.id },
      { colorName },
      { new: true }
    );
    res.json({
      success: true,
      message: "Update successfully",
      color: updatedColor,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//! API delete color
router.delete("/", auth, authAdmin, async (req, res) => {
  try {
    let deletedColor;
    if (req.query.id) {
      const productColor = await Product.find({
        "sizeColor.color": req.query.id,
      });
      for (let i = 0; i < productColor.length; i++) {
        const product = productColor[i];
        await Product.findByIdAndUpdate(product._id, {
          $set: {
            sizeColor: product.sizeColor.filter(
              (item) => item.color.toString() !== req.query.id
            ),
          },
        });
      }
      deletedColor = await Color.findByIdAndDelete(req.query.id);
    } else {
      await Product.deleteMany({});
      deletedColor = await Color.deleteMany({});
    }

    res.json({
      success: true,
      message: "Delete successfully",
      color: deletedColor,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
