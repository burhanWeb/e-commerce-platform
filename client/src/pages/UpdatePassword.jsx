import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { updatePassword } from "../redux/slices/auth/AuthSlice";
import { useDispatch } from "react-redux";

function UpdatePassword() {
  const dispatch = useDispatch();
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updatePassword(passwords));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPasswords({ ...passwords, [name]: value });
  };
  return (
    <Card sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          Update Password
        </Typography>
        <form>
          <TextField
            name="oldPassword"
            label="Old Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={passwords.oldPassword}
            onChange={handleChange}
          />
          <TextField
            name="newPassword"
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={passwords.newPassword}
            onChange={handleChange}
          />
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={passwords.confirmPassword}
            onChange={handleChange}
          />

          <Button
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            // disabled={loading}
          >
            {/* {loading ? "Updating..." : "Update Password"} */}
            submit
          </Button>
        </form>

        {/* {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mt: 2 }}>Password updated successfully!</Alert>} */}
      </CardContent>
    </Card>
  );
}

export default UpdatePassword;
