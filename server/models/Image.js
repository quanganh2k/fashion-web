const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    color: {
      type: Schema.Types.ObjectId,
      ref: "colors",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "products",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("images", ImageSchema);
