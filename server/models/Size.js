const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SizeSchema = new Schema(
  {
    productSize: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("sizes", SizeSchema);
