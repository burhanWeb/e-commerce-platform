import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import {
  setFilters,
  fetchFilterProducts,
  clearFilters,
  fetchProducts,
} from "../redux/slices/product/ProductsSlice";
import { useEffect } from "react";

function Filters() {
  const { filters, categories } = useSelector((state) => state.product);
  const newCategories = ["All", ...new Set(categories)];
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    dispatch(setFilters({ [name]: value }));
  };
  const handleFilterReset = (e) => {
    dispatch(clearFilters());
    dispatch(fetchProducts());
  };

  const HandleFilterApply = (e) => {
    e.preventDefault();
    if (filters) {
      dispatch(fetchFilterProducts(filters));
    }
  };
  return (
    <Box p={3} border="1px solid #ddd" borderRadius="8px" width="100%">
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Category
      </Typography>
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          label="Category"
        >
          {newCategories.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box my={2}>
        <Typography gutterBottom>Price Range</Typography>
        {
          <Slider
            name="price"
            value={[filters.minPrice || 0, filters.maxPrice || 25000]}
            valueLabelDisplay="auto"
            min={0}
            max={25000}
            onChange={(_, newValue) => {
              dispatch(
                setFilters({ minPrice: newValue[0], maxPrice: newValue[1] })
              );
            }}
          />
        }
      </Box>

      {/* Apply Button */}
      <Button type="submit" onClick={HandleFilterApply}>
        Apply
      </Button>
      <Button type="submit" onClick={handleFilterReset}>
        Reset
      </Button>
    </Box>
  );
}

export default Filters;
