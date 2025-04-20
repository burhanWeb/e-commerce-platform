import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, Container, Grid2, Link, Typography } from "@mui/material";

const useStyles = makeStyles({
  footerContainer: {
    background: "#1a1a1a",
    height: "calc(80vh - 50vh)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0.4rem",
    flexDirection: "column",
  },
});

function Footer() {
  return (
    <Box sx={{ backgroundColor: "#333", color: "white", py: 4, mt: "auto" }}>
      <Container>
        <Grid2 container spacing={4}>
          <Grid2 item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold">
              MyShop
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
              Your one-stop shop for the best products at unbeatable prices.
            </Typography>
          </Grid2>

          <Grid2 item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold">
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", mt: 1 }}>
              <Link href="#" color="inherit" sx={{ opacity: 0.8, mb: 1 }}>
                Shop
              </Link>
              <Link href="#" color="inherit" sx={{ opacity: 0.8, mb: 1 }}>
                About Us
              </Link>
              <Link href="#" color="inherit" sx={{ opacity: 0.8, mb: 1 }}>
                Contact
              </Link>
              <Link href="#" color="inherit" sx={{ opacity: 0.8 }}>
                FAQs
              </Link>
            </Box>
          </Grid2>
        </Grid2>

        <Typography
          variant="body2"
          textAlign="center"
          sx={{ opacity: 0.7, mt: 4 }}
        >
          © {new Date().getFullYear()} MyShop. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
