import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  updateProductsInState,
  fetchUpdateProduct,
  fetchDeleteProduct,
  deleteProductInState,
} from "../redux/slices/product/ProductsSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from "@mui/material";

const AdminProduct = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const [editMode, setEditMode] = useState(null);
  const [updatedData, setUpdatedData] = useState(null);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleEdit = (product) => {
    setEditMode(product._id);
    setUpdatedData(product);
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };
  const handleUpdateProduct = () => {
    if (updatedData) {
      setLoadingUpdate(true);

      try {
        dispatch(
          fetchUpdateProduct({
            productId: updatedData._id,
            productData: updatedData,
          })
        );
        dispatch(
          updateProductsInState({
            productId: updatedData._id,
            updatedData: updatedData,
          })
        );
        setEditMode(null);
      } catch (error) {
        console.error("Update failed:", error);
      } finally {
        setLoadingUpdate(false);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setUpdatedData(null);
  };

  const handleDeleteProduct = (productId) => {
    dispatch(fetchDeleteProduct(productId));
    dispatch(deleteProductInState(productId));
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Admin Products</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length > 0 ? (
              products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product._id}</TableCell>
                  <TableCell>
                    {editMode === product._id ? (
                      <TextField
                        name="name"
                        value={updatedData?.name || ""}
                        onChange={handleInputChange}
                      />
                    ) : (
                      product.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode === product._id ? (
                      <TextField
                        name="price"
                        value={updatedData?.price || ""}
                        onChange={handleInputChange}
                      />
                    ) : (
                      `$${product.price}`
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode === product._id ? (
                      <TextField
                        name="description"
                        value={updatedData?.description || ""}
                        onChange={handleInputChange}
                      />
                    ) : (
                      product.description
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode === product._id ? (
                      <>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={handleUpdateProduct}
                          disabled={loadingUpdate}
                        >
                          {loadingUpdate ? "Saving..." : "Save"}
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={handleCancelEdit}
                          style={{ marginLeft: "10px" }}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEdit(product)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDeleteProduct(product._id)}
                          style={{ marginLeft: "10px" }}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No Products Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminProduct;
