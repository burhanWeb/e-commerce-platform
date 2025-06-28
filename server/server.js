import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";

import cookieParser from "cookie-parser";
import cors from "cors";
import Razorpay from "razorpay";

import ProductRoutes from "./routes/productsRouters.js";
import UserRoutes from "./routes/userRoutes.js";
import OrderRoutes from "./routes/orderRoutes.js";
import CartRoutes from "./routes/cartRoutes.js";

const app = express();

// Middleware Setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
  })
);

export const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

app.use("/api/v1/products", ProductRoutes);
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/cart", CartRoutes);
app.use("/api/v1/orders", OrderRoutes);

app.listen(process.env.PORT, async () => {
  await connectDB(process.env.MONGO_URL);
});

export default app;
