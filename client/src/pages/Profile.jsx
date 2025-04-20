import { Box, Button, Grid2, Typography, Paper } from "@mui/material";
import React from "react";
import demo from "../images/demo.png";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <Box sx={{ p: { xs: 2, md: 5 }, width: "100%", minHeight: "100vh" }}>
      {/* Back Button */}
      <Button
        component={Link}
        to="/products"
        variant="outlined"
        color="primary"
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      {/* Page Title */}
      <Typography variant="h3" align="center" gutterBottom>
        Profile
      </Typography>

      {/* Main Grid Layout */}
      <Grid2
        container
        spacing={4}
        justifyContent="center"
        alignItems="flex-start"
        mt={2}
      >
        {/* Profile Picture & Edit */}
        <Grid2
          xs={12}
          md={4}
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
        >
          <Box
            component="img"
            src={demo}
            alt="Profile"
            sx={{
              width: { xs: 200, sm: 250, md: 300 },
              height: { xs: 200, sm: 250, md: 300 },
              borderRadius: "50%",
              objectFit: "cover",
              boxShadow: 3,
            }}
          />

          <Button
            component={Link}
            to="/update-profile"
            variant="contained"
            color="primary"
            size="medium"
          >
            Edit Profile
          </Button>
        </Grid2>

        {/* Info Section */}
        <Grid2 xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Grid2 container spacing={3} direction="column">
              <Grid2 item>
                <Typography variant="h6">Full Name</Typography>
                <Typography variant="body1" color="text.secondary">
                  Burhan
                </Typography>
              </Grid2>

              <Grid2 item>
                <Typography variant="h6">Email</Typography>
                <Typography variant="body1" color="text.secondary">
                  burhan@example.com
                </Typography>
              </Grid2>

              <Grid2 item>
                <Typography variant="h6">Joined On</Typography>
                <Typography variant="body1" color="text.secondary">
                  January 1, 2024
                </Typography>
              </Grid2>

              {/* Buttons */}
              <Grid2 item container spacing={2}>
                <Grid2 item xs={12} sm={6}>
                  <Button
                    component={Link}
                    to="/update-password"
                    variant="outlined"
                    fullWidth
                  >
                    Change Password
                  </Button>
                </Grid2>
                <Grid2 item xs={12} sm={6}>
                  <Button
                    component={Link}
                    to="/my-orders"
                    variant="contained"
                    fullWidth
                  >
                    My Orders
                  </Button>
                </Grid2>
              </Grid2>
            </Grid2>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default Profile;
