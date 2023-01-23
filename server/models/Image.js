const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema(
  {
    image: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("images", ImageSchema);
