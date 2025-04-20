import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/slices/auth/AuthSlice";
const Signup = ({ onSwitch }) => {
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const [preview, setPreview] = useState("");
  const [image, setImage] = useState(null);

  const handleImageFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };
  const handleUpload = () => {};

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("image", image);

    dispatch(register(formData));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 5,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <Box
        component="form"
        sx={{ mt: 3, width: "100%", maxWidth: "400px" }}
        onSubmit={handleSubmit}
      >
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          id="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          id="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type="password"
          id="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "Sign Up"}
        </Button>
        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
          Already have an account? <Link to={"/login"}>Login</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Signup;
