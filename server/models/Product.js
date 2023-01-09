const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSizeColorSchema = new Schema(
  {
    quantity: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Number,
    },
    size: {
      type: Schema.Types.ObjectId,
      ref: "sizes",
    },
    color: {
      type: Schema.Types.ObjectId,
      ref: "colors",
    },
  },
  { timestamps: true }
);

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },
    classify: {
      type: Schema.Types.ObjectId,
      ref: "classifies",
    },
    sizeColor: [ProductSizeColorSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", ProductSchema);
