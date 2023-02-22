const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add order name"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please add order category"],
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      default: "SKU",
      trim: true,
    },
    quantity: {
      type: String,
      required: [true, "Please add order quantity"],
      trim: true,
    },
    price: {
      type: String,
      required: [true, "Please add order price"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
