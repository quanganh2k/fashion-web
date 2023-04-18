const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const Classify = require("../models/Classify");
const Product = require("../models/Product");

//! API get all classify
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const name = req.query.search;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    const filters = {};
    if (name) {
      filters.name = { $regex: name, $options: "i" };
    }

    const allData = await Classify.find(filters).exec();

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
    results.data = await Classify.find(filters)
      .limit(limit)
      .skip(startIndex)
      .exec();

    res.json({ success: true, results: results });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//! API get classify details
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const classify = await Classify.findById(id);
    res.json({ success: true, classify });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//! API create classify
router.post("/", auth, authAdmin, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "You need to fill full information" });
    }
    const classify = await Classify.findOne({ name });
    if (classify) {
      return res
        .status(400)
        .json({ success: false, message: "Classify name already exists" });
    }
    const newClassify = new Classify({ name });
    await newClassify.save();
    res.json({
      success: true,
      message: "Create successfully",
      classify: newClassify,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//! API Update classify
router.put("/:id", auth, authAdmin, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "You need to fill full information" });
    }

    const updatedClassify = await Classify.findByIdAndUpdate(
      { _id: req.params.id },
      { name },
      { new: true }
    );

    res.json({
      success: true,
      message: "Update successfully",
      classify: updatedClassify,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//! API Delete classify
router.delete("/", auth, authAdmin, async (req, res) => {
  try {
    let deletedClassify;
    if (req.query.id) {
      const productClassify = await Product.find({ classify: req.query.id });

      const listIdProduct = productClassify.map((el) => el._id);
      await Product.deleteMany({
        _id: {
          $in: listIdProduct,
        },
      });
      deletedClassify = await Classify.findByIdAndDelete(req.query.id);
    } else {
      await Product.deleteMany({});
      deletedClassify = await Classify.deleteMany({});
    }

    res.json({
      success: true,
      message: "Delete successfully",
      classify: deletedClassify,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});
module.exports = router;
