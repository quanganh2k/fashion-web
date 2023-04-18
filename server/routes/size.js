const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const Size = require("../models/Size");
const Product = require("../models/Product");

//! API get all sizes
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const productSize = req.query.search;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    const filters = {};
    if (productSize) {
      filters.productSize = { $regex: productSize, $options: "$i" };
    }

    const allData = await Size.find(filters).exec();

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

    results.totalData = total;
    results.pageCount = Math.ceil(total / limit);
    results.data = await Size.find(filters)
      .limit(limit)
      .skip(startIndex)
      .exec();

    res.json({ success: true, results: results });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//! API get size details
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const size = await Size.findById(id);
    res.json({ success: true, size });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//! API create size
router.post("/", auth, authAdmin, async (req, res) => {
  try {
    const { productSize } = req.body;
    if (!productSize) {
      return res
        .status(400)
        .json({ success: false, message: "You need to fill full information" });
    }
    const size = await Size.findOne({ productSize });
    if (size) {
      return res
        .status(400)
        .json({ success: false, message: "Size name already exists" });
    }
    const newSize = new Size({ productSize });
    await newSize.save();
    res.json({ success: true, message: "Create successfully", size: newSize });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//! API update size
router.put("/:id", auth, authAdmin, async (req, res) => {
  try {
    const { productSize } = req.body;
    if (!productSize) {
      return res
        .status(400)
        .json({ success: false, message: "You need to fill full information" });
    }

    const updatedSize = await Size.findByIdAndUpdate(
      { _id: req.params.id },
      { productSize },
      { new: true }
    );
    res.json({
      success: true,
      message: "Update successfully",
      size: updatedSize,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//! API delete size
router.delete("/", auth, authAdmin, async (req, res) => {
  try {
    let deletedSize;
    if (req.query.id) {
      const productSize = await Product.find({
        "sizeColor.size": req.query.id,
      });
      for (let i = 0; i < productSize.length; i++) {
        const product = productSize[i];
        await Product.findByIdAndUpdate(product._id, {
          $set: {
            sizeColor: product.sizeColor.filter(
              (item) => item.size.toString() !== req.query.id
            ),
          },
        });
      }
      deletedSize = await Size.findByIdAndDelete(req.query.id);
    } else {
      await Product.deleteMany({});
      deletedSize = await Size.deleteMany({});
    }

    res.json({
      success: true,
      message: "Delete successfully",
      size: deletedSize,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
