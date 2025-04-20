import mongoose from "mongoose";
import { type } from "os";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
    },
    description: {
      type: String,
      required: [true, "Please enter product decsription"],
    },
    price: {
      type: Number,
      reqired: true,
      maxLength: 8,
    },

    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    stock: {
      type: String,
      required: true,
      default: 1,
    },

    featured: {
      type: Boolean,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timeStamps: true,
  }
);

const ProductSchema = mongoose.model("Products", productSchema);

export default ProductSchema;
