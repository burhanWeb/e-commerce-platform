import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../../utils/axios.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Fetch Featured Products
export const fetchFeaturedProducts = createAsyncThunk(
  "/featuredProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await customFetch.get("products/featuredProducts");
      return response.data.slice(0, 4);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch featured products!"
      );
    }
  }
);

// Fetch All Products
export const fetchProducts = createAsyncThunk(
  "/products",
  async (_, { rejectWithValue }) => {
    try {
      const response = await customFetch.get("/products");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products!"
      );
    }
  }
);

// Fetch Categories
export const fetchCategories = createAsyncThunk(
  "products/categories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await customFetch.get("products/categories");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories!"
      );
    }
  }
);

// Fetch Filtered Products
export const fetchFilterProducts = createAsyncThunk(
  "/products/fetchFilteredProducts",
  async (filters, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await customFetch.get(`/products?${queryParams}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch filtered products!"
      );
    }
  }
);

// Fetch Single Product
export const fetchSingleProduct = createAsyncThunk(
  "/products/fetchSingleProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await customFetch.get(`/products/product/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product details!"
      );
    }
  }
);

// Update Product
export const fetchUpdateProduct = createAsyncThunk(
  "/products/updateProduct",
  async ({ productId, productData }, { rejectWithValue }) => {
    try {
      const response = await customFetch.put(
        `/products/product/${productId}`,
        productData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update product!"
      );
    }
  }
);
export const createProduct = createAsyncThunk(
  "/createProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await customFetch.post("products/new", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create product!"
      );
    }
  }
);
// Delete Product
export const fetchDeleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await customFetch.delete(
        `/products/product/${productId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete product!"
      );
    }
  }
);
// Delete All Products

export const ProductSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    featuredProducts: [],
    isLoading: false,
    categories: [],
    singleProduct: [],
    error: null,
    updateProductError: null,
    updateProductSuccess: null,
    filters: {
      category: "",
      minPrice: 0,
      maxPrice: 25000,
      rating: "",
    },
  },

  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: "",
        price: "",
      };
    },
    updateProductsInState: (state, action) => {
      const { productId, updatedData } = action.payload;
      const product = state.products.find(
        (product) => product._id === productId
      );
      if (product) {
        product.name = updatedData.name;
        product.price = updatedData.price;
        product.description = updatedData.description;
      }
    },
    deleteProductInState: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter(
        (product) => product._id !== productId
      );
    },
  },

  extraReducers: (builder) => {
    // Featured Products
    builder
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featuredProducts = action.payload;
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });

    // Products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;

        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });

    // Categories
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });

    // Filtered Products
    builder
      .addCase(fetchFilterProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilterProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        toast.success("Filtered products loaded!");
      })
      .addCase(fetchFilterProducts.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });

    // Single Product
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.singleProduct = [action.payload];
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });

    // Update Product
    builder
      .addCase(fetchUpdateProduct.pending, (state) => {
        state.isLoading = true;
        toast.info("Updating product...");
      })
      .addCase(fetchUpdateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(
          action.payload.message || "Product updated successfully!"
        );
      })
      .addCase(fetchUpdateProduct.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      }); // Create Product
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        toast.info("Creating product...");
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;

        toast.success(action.payload || "Product created successfully!");
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });
    // Delete Product
    builder
      .addCase(fetchDeleteProduct.pending, (state) => {
        state.isLoading = true;
        toast.info("Deleting product...");
      })
      .addCase(fetchDeleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action.payload || "Product deleted successfully!");
      })
      .addCase(fetchDeleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });
  },
});

export const {
  setFilters,
  updateProductsInState,
  clearFilters,
  deleteProductInState,
} = ProductSlice.actions;
export default ProductSlice.reducer;
