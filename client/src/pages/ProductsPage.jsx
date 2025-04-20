import { Box, Grid2, CircularProgress, Grid } from "@mui/material";
import { Filters, ProductsList } from "../components";
import {
  fetchCategories,
  fetchProducts,
} from "../redux/slices/product/ProductsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ProductsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const { isLoading } = useSelector((state) => state.product);

  return (
    <div>
      {isLoading ? (
        <Box
          width={"100%"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid2 display={"flex"} width={"100%"}>
          {/* Sidebar Filters */}
          <Grid2 width={"30%"} padding={2}>
            <Filters />
          </Grid2>

          {/* Products List Section */}
          <Grid2 width={"80%"} padding={2}>
            <ProductsList />
          </Grid2>
        </Grid2>
      )}
    </div>
  );
}

export default ProductsPage;
