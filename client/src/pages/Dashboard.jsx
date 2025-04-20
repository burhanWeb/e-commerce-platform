import { Grid2, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { AdminSideBar } from ".";

function Dashboard() {
  return (
    <>
      <AdminSideBar />
      <Grid2
        container
        direction="column"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ height: "50vh" }}
      >
        <Grid2>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
        </Grid2>
        <Grid2>
          <Typography variant="body1">
            Welcome to the admin dashboard
          </Typography>
        </Grid2>
        <Grid2>
          <Typography variant="h6">Total Amount</Typography>
        </Grid2>
        <Grid2>
          <Typography variant="h5" color="primary">
            $2,828,227
          </Typography>
        </Grid2>

        <Grid2>
          <Grid2 container spacing={2} justifyContent="center">
            <Grid2>
              <Link to="/admin/products" style={{ textDecoration: "none" }}>
                <Typography
                  textAlign={"center"}
                  alignContent="center"
                  justifyContent={"center"}
                  sx={{
                    background: "black",
                    color: "white",
                    width: "200px",
                    height: "200px",
                    borderRadius: "60%",
                  }}
                >
                  Products
                </Typography>
              </Link>
            </Grid2>
            <Grid2>
              <Link to="/admin/orders" style={{ textDecoration: "none" }}>
                <Typography
                  textAlign={"center"}
                  alignContent="center"
                  justifyContent={"center"}
                  sx={{
                    background: "#1976d2",
                    color: "white",
                    width: "200px",
                    height: "200px",
                    borderRadius: "60%",
                  }}
                >
                  Orders
                </Typography>
              </Link>
            </Grid2>
            <Grid2>
              <Link to="/admin/users" style={{ textDecoration: "none" }}>
                <Typography
                  textAlign={"center"}
                  alignContent="center"
                  justifyContent={"center"}
                  sx={{
                    background: "#d32f2f",
                    color: "white",
                    width: "200px",
                    height: "200px",
                    borderRadius: "60%",
                  }}
                >
                  Users
                </Typography>
              </Link>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  );
}

export default Dashboard;
