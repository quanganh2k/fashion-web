const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderDetailSchema = new Schema(
  {
    sizeChoice: {
      type: Number,
      required: true,
    },
    colorChoice: {
        type: String,
        required: true
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "orders",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "products",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orderDetails", OrderDetailSchema);