import React, { useEffect, useState } from "react";
import {
  fetchAllUsers,
  updateUserRole,
  updateRoleInState,
} from "../redux/slices/auth/AuthSlice.js";
import { useDispatch, useSelector } from "react-redux";
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
function AdminUsers() {
  const dispatch = useDispatch();

  const { allUsers } = useSelector((state) => state.auth);
  console.log(allUsers);
  const [editMode, setEditMode] = useState(null);
  const [updatedData, setUpdatedData] = useState(null);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);
  const handleEdit = (user) => {
    setEditMode(user._id);
    setUpdatedData(user);
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };
  const handleUpdateuser = () => {
    if (updatedData) {
      setLoadingUpdate(true);

      try {
        dispatch(
          updateUserRole({
            userId: updatedData._id,
            updatedData: updatedData,
          })
        );
        dispatch(
          updateRoleInState({
            userId: updatedData._id,
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

  return (
    <div>
      <div>
        <h2 style={{ textAlign: "center" }}>ALL Users</h2>
        <TableContainer style={{ padding: "1rem" }} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>NameE</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers.length > 0 ? (
                allUsers.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user._id}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>
                      {editMode === user._id ? (
                        <TextField
                          name="role"
                          id="role"
                          value={updatedData?.role || ""}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <strong style={{ color: "green" }}> {user.role}</strong>
                      )}
                    </TableCell>
                    <TableCell>
                      {editMode === user._id ? (
                        <>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={handleUpdateuser}
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
                            onClick={() => handleEdit(user)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            // onClick={() => handleDeleteuser(user._id)}
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
                    No User Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default AdminUsers;
