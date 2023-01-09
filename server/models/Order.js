const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now(),
    },
    statusOrder: {
      type: String,
      enum: ["Delivering", "Completed", "Cancel"],
      default: "Delivering",
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Unpaid"],
      default: "Unpaid",
    },
    total: {
      type: Number,
      required: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "customers",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", OrderSchema);
