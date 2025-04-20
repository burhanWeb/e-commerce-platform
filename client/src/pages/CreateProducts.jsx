import React, { useState } from "react";
import {
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Container,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { createProduct } from "../redux/slices/product/ProductsSlice";
import { useDispatch } from "react-redux";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    featured: false,
    imageFile: null, // file object
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setProduct({ ...product, imageFile: files[0] });
    } else {
      setProduct({
        ...product,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("stock", product.stock);
    formData.append("featured", product.featured);
    formData.append("productImage", product.imageFile);

    dispatch(createProduct(formData));
    // Handle form submission logic here
    console.log("Form submitted:", product);
    // Reset form
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, marginTop: 5 }}>
        <Typography variant="h5" gutterBottom textAlign="center">
          Create Product
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Product Name"
            name="name"
            value={product.name}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            multiline
            rows={3}
            value={product.description}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Category"
            name="category"
            value={product.category}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Stock Quantity"
            name="stock"
            type="number"
            value={product.stock}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Button variant="outlined" component="label" sx={{ mt: 2 }}>
            Upload Image
            <input
              type="file"
              name="productImage"
              hidden
              accept="image/*"
              onChange={handleChange}
            />
          </Button>

          {product.imageFile && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected: {product.imageFile.name}
            </Typography>
          )}

          <FormControlLabel
            control={
              <Checkbox
                checked={product.featured}
                onChange={handleChange}
                name="featured"
              />
            }
            label="Featured Product"
            sx={{ mt: 2 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, borderRadius: 2 }}
          >
            Create Product
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateProduct;
