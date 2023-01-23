const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const Product = require("../models/Product");

//! API Get all products
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
      filters.name = { $regex: name, $options: "$i" };
    }

    const allData = await Product.find(filters).exec();

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
    results.data = await Product.find(filters)
      .limit(limit)
      .skip(startIndex)
      .exec();

    res.json({ success: true, results: results });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//! API Get product details
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findById(id)
        res.json({success: true, product})
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
})

//! API Create Product
router.post("/", auth, authAdmin, async (req, res) => {
  try {
    const { name, price, description, category, classify, sizeColor } =
      req.body;
    if (
      !name ||
      !price ||
      !description ||
      !category ||
      !classify ||
      !sizeColor ||
      sizeColor.length == 0
    ) {
      return res
        .status(400)
        .json({ success: false, message: "You need to fill full information" });
    }
    const product = await Product.findOne({ name });
    if (product) {
      return res
        .status(400)
        .json({ success: false, message: "Product already exists" });
    }
    for (const item of sizeColor) {
      if (
        !item.quantity ||
        !item.inStock ||
        !item.size ||
        !item.color ||
        !item.images ||
        item.images.length == 0
      ) {
        return res.status(400).json({
          success: false,
          message: "You need to fill full information11",
        });
      }
    }
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      classify,
      sizeColor,
    });
    await newProduct.save();
    res.json({
      success: true,
      message: "Create successfully",
      product: newProduct,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//! API Update Product
router.put("/:id", auth, authAdmin, async (req, res) => {
  try {
    const { name, price, description, category, classify, sizeColor } =
      req.body;
    if (
      !name ||
      !price ||
      !description ||
      !category ||
      !classify ||
      !sizeColor ||
      sizeColor.length == 0
    ) {
      return res
        .status(400)
        .json({ success: false, message: "You need to fill full information" });
    }

    for (const item of sizeColor) {
      if (
        !item.quantity ||
        !item.inStock ||
        !item.size ||
        !item.color ||
        !item.images ||
        item.images.length == 0
      ) {
        return res.status(400).json({
          success: false,
          message: "You need to fill full information11",
        });
      }
    }
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        name,
        price,
        description,
        category,
        classify,
        sizeColor,
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Update successfully",
      product: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//! API delete product
router.delete("/", auth, authAdmin, async (req, res) => {
  try {
    const filter = {};
    if (req.query.listId && req.query.listId.length > 0) {
      filter._id = {
        $in: req.query.listId,
      };
    }
    const deletedProduct = await Product.deleteMany(filter);
    res.json({
      success: true,
      message: "Delete successfully",
      product: deletedProduct,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
