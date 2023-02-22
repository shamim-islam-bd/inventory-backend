const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const authorizeRoles = require("../middleWare/authMiddleware");
const { createOrder, updateOrder, deleteOrder, getOrders, getOrder } = require("../controllers/orderController");
// const { upload } = require("../utils/fileUpload");


router.post("/", protect, createOrder);
router.get("/", protect, getOrders);
router.patch("/:id", protect, updateOrder);
router.get("/:id", protect, getOrder);
router.delete("/:id", protect, deleteOrder);

module.exports = router;