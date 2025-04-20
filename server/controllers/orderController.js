// controllers/orderController.js
import crypto from "crypto";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js";
import { StatusCodes } from "http-status-codes";

import { instance } from "../server.js";

export const checkout = async (req, res) => {
  const { grossTotal } = req.body;

  try {
    const options = {
      amount: grossTotal * 100,
      currency: "INR",
    };

    const order = await instance.orders.create(options);

    // Send success response
    res.status(StatusCodes.OK).json({ order });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

export const PaymentVerification = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    shippingInfo,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res
      .status(400)
      .json({ success: false, message: "Missing payment details." });
  }

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({
      success: false,
      message: "Signature mismatch. Payment verification failed.",
    });
  }

  try {
    let existingOrder = await Order.findOne({
      "paymentInfo.id": razorpay_payment_id,
    });
    if (existingOrder) {
      return res.status(200).json({ success: true, order: existingOrder });
    }

    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Product ${
            product?.name || "unknown"
          } is out of stock or insufficient stock.`,
        });
      }
      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo: {
        id: razorpay_payment_id,
        status: "succeeded",
      },
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user.userId,
    });

    await Cart.findOneAndDelete({ user: req.user.userId });

    res.status(200).json({ success: true, order });
  } catch (err) {
    console.error("Payment verification error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Order not found" });
    }
    res.status(StatusCodes.OK).json(order);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId });

    if (orders.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No orders found" });
    }

    res.status(StatusCodes.OK).json(orders);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find({});
    if (orders.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No orders found" });
    }

    res.status(StatusCodes.OK).json(orders);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// toay

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const { orderStatus } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Order not found" });
    }

    if (order.orderStatus === "Delivered") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Order has already been delivered" });
    }

    order.orderStatus = orderStatus;

    if (orderStatus === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save();

    res.status(200).json({ message: "Order updated successfully", order });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error updating order",
      error: error.message,
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Order not found" });
    }

    await Order.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json({ message: "Order deleted successfully" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (products.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No products found" });
    }
    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
