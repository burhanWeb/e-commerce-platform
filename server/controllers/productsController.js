import { log } from "console";
import Product from "../models/productModel.js";
import ApiFeatures from "../utils/apifeatures.js";
import { StatusCodes } from "http-status-codes";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, featured } = req.body;
    const image = req.file;

    if (!name || !price || !category || !image) {
      return res.status(400).json({ message: "Missing required fields!" });
    }

    let imageUrl = null;

    if (image) {
      const uploadResult = await uploadOnCloudinary(image.path);
      if (!uploadResult) {
        return res.status(500).json({ message: "Image upload failed!" });
      }
      imageUrl = uploadResult.secure_url;
    }

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      featured,
      image: imageUrl,
      user: req.user.userId,
    });

    await newProduct.save();

    res.status(StatusCodes.CREATED).json({
      newProduct,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({ featured: true });
    res.status(StatusCodes.OK).json(featuredProducts);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");

    res.status(StatusCodes.OK).json(categories);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};
export const getAllProducts = async (req, res) => {
  const apifeatures = new ApiFeatures(Product.find(), req.query).filter();
  const products = await apifeatures.query;

  res.status(StatusCodes.OK).json(products);
};
export const updateProducts = async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    res.status(StatusCodes.BAD_REQUEST).json("product not found");
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(StatusCodes.OK).json(product);
};

export const deleteProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      res.status(StatusCodes.NOT_FOUND).json("product not found");
    }
    product = await Product.findByIdAndDelete(product);
    res.status(StatusCodes.OK).json("product delteed");
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(StatusCodes.OK).json("product not found");
    }

    res.status(StatusCodes.OK).json(product);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};
