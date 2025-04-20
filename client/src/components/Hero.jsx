import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";

import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
function Hero() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
          "url('https://source.unsplash.com/1600x900/?shopping,fashion')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0,0,0,0.5)",
        }}
      />

      {/* Content */}
      <Container
        maxWidth="md"
        sx={{ textAlign: "center", position: "relative", zIndex: 10 }}
      >
        <Typography
          variant="h3"
          component="h1"
          color="white"
          fontWeight="bold"
          gutterBottom
        >
          Discover the Best Deals!
        </Typography>
        <Typography variant="h6" color="white" paragraph>
          Shop the latest trends at unbeatable prices.
        </Typography>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2 }}>
          <Link to={"/products"}>
            <Button variant="contained" color="primary" size="large">
              Shop Now
            </Button>
          </Link>
          <Button variant="outlined" color="inherit" size="large">
            Learn More
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Hero;
