import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pinCode: { type: Number, required: true },
    phoneNo: { type: Number, required: true },
  },

  orderItems: [
    {
      name: { type: String },
      price: { type: Number },
      image: { type: String },
      quantity: { type: Number },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],

  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  paymentInfo: {
    id: { type: String },
    status: { type: String },
  },

  paidAt: { type: Date },

  itemsPrice: { type: Number, default: 0 },
  taxPrice: { type: Number, default: 0 },
  shippingPrice: { type: Number, default: 0 },
  totalPrice: { type: Number, default: 0 },

  orderStatus: { type: String, default: "Processing" },
  deliveredAt: Date,
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
