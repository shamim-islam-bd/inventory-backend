const asyncHandler = require("express-async-handler");
const { fileSizeFormatter } = require("../utils/fileUpload");
const Order = require("../models/orderModel");
const cloudinary = require("cloudinary").v2;

// Create Prouct
const createOrder = asyncHandler(async (req, res) => {
  const { name, category, quantity, price } = req.body;

  //   Validation
  if (!name || !category || !quantity || !price ) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Create Product
  const order = await Order.create({
    user: req.user.id,
    name,
    category,
    quantity,
    price,
  });

  // console.log("order make frm Backend: ", order)

  res.status(201).json(order);
});

// Get all Products
const getOrders = asyncHandler(async (req, res) => {
  // const products = await Product.find({ user: req.user.id }).sort("-createdAt");
  const orders = await Order.find();
  // console.log("All Orders frm bck: ", orders);
  res.status(200).json(orders);
});

// Get single product
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  // if order doesnt exist
  if (!order) {
    res.status(404);
    throw new Error("order not found");
  }
  // Match product to its user
  if (order.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(order);
});

// Delete Product
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  // if product doesnt exist
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  // Match product to its user
  if (order.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await order.remove();
  res.status(200).json({ message: "order deleted." });
});

// Update Product
const updateOrder = asyncHandler(async (req, res) => {
  const { name, category, quantity, price } = req.body;
  const { id } = req.params;

  const order = await Order.findById(id);

  // if product doesnt exist
  if (!order) {
    res.status(404);
    throw new Error("order not found");
  }
  // Match product to its user
  if (order.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Update Product
  const updatedProduct = await Order.findByIdAndUpdate(
    { _id: id },
    {
      name,
      category,
      quantity,
      price,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedProduct);
});

module.exports = {
  createOrder,
  getOrder,
  getOrders,
  updateOrder,
  deleteOrder
};
