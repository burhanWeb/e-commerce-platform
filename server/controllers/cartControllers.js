import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import { StatusCodes } from "http-status-codes";
export const addOrIncrementItem = async (req, res) => {
  try {
    const { product, name, price, quantity, image } = req.body;

    const productItem = await Product.findById(product);

    if (!productItem) {
      return res.status(404).json({ message: "Product not found" });
    }

    let item = await Cart.findOne({ product });
    const newQuantity = item ? item.quantity + 1 : quantity;

    if (item) {
      if (newQuantity > productItem.stock) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Not enough stock available" });
      }

      item.quantity = newQuantity;
      await item.save();
    } else {
      if (quantity > productItem.stock) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Not enough stock available" });
      }

      item = new Cart({
        product,
        name,
        price,
        quantity,
        image,
        user: req.user.userId,
      });
      await item.save();
    }

    res.status(StatusCodes.OK).json(item);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error adding item", error });
  }
};

export const decrementOrRemoveItem = async (req, res) => {
  try {
    const { product, quantity } = req.body;

    const item = await Cart.findOne({ product });

    if (!item)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Item not found" });

    if (item.quantity > quantity) {
      item.quantity -= 1;
      await item.save();
      return res
        .status(StatusCodes.OK)
        .json({ message: "Quantity decreased", item });
    }

    await Cart.findByIdAndDelete(item._id);
    res.status(StatusCodes.OK).json({ message: "Item removed from cart" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error decrementing item", error: error.message });
  }
};

export const fetchCartItems = async (req, res) => {
  try {
    const items = await Cart.find({});

    const updatedItems = items.map((item) => ({
      ...item.toObject(), // convert Mongoose doc to plain object
      subtotal: item.price * item.quantity,
    }));

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const grossTotal = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    res.status(StatusCodes.OK).json({
      updatedItems,
      cartCount,
      grossTotal,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error fetching cart items", error: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    await Cart.deleteMany({ user: req.user.userId });
    res.status(StatusCodes.OK).json({ message: "Cart cleared" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error clearing cart", error: error.message });
  }
};
