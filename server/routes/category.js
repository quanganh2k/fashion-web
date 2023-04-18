const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const Category = require("../models/Category");
const Product = require("../models/Product");

//! API get all categories
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

    const allData = await Category.find(filters).exec();

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
    results.data = await Category.find(filters)
      .limit(limit)
      .skip(startIndex)
      .exec();

    res.json({ success: true, results: results });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//! API Get category details
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id);
    res.json({ success: true, category });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//! API create category
router.post("/", auth, authAdmin, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "You need to fill full information" });
    }
    const category = await Category.findOne({ name });
    if (category) {
      return res
        .status(400)
        .json({ success: false, message: "Category name already exists" });
    }
    const newCategory = new Category({ name });
    await newCategory.save();
    res.json({
      success: true,
      message: "Create successfully",
      category: newCategory,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//! API Update category
router.put("/:id", auth, authAdmin, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "You need to fill full information" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      { _id: req.params.id },
      { name },
      { new: true }
    );

    res.json({
      success: true,
      message: "Update successfully",
      category: updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//! API Delete category
router.delete("/", auth, authAdmin, async (req, res) => {
  try {
    let deletedCategory;
    if (req.query.id) {
      const productCategory = await Product.find({ category: req.query.id });

      const listIdProduct = productCategory.map((el) => el._id);
      await Product.deleteMany({
        _id: {
          $in: listIdProduct,
        },
      });

      deletedCategory = await Category.findByIdAndDelete(req.query.id);
    } else {
      await Product.deleteMany({});
      deletedCategory = await Category.deleteMany({});
    }

    res.json({
      success: true,
      message: "Delete successfully",
      category: deletedCategory,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});
module.exports = router;
