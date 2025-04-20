import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/slices/auth/AuthSlice";

function UpdateProfile() {
  const dispatch = useDispatch();
  const { user: me, loading, error } = useSelector((state) => state.auth);
  const [fromData, setFromData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFromData({ ...fromData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(fromData));
  };
  return (
    <div>
      {" "}
      <Box display="flex" flexDirection="column" alignItems="center" p={4}>
        <Typography variant="h4" mb={3}>
          Edit Profile
        </Typography>
        {/* {error && <Typography color="error">{error}</Typography>} */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
          width="100%"
          maxWidth={400}
        >
          <TextField
            label="Full Name"
            name="name"
            value={fromData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={fromData.email}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            submit
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default UpdateProfile;
