import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchCart } from "../redux/slices/cart/CartSlice";
import { logout, logoutUser } from "../redux/slices/auth/AuthSlice";
import { removeUserFromLocalStorage } from "../utils/localStorage";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { cartCount } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleLogout = () => {
    removeUserFromLocalStorage();
    dispatch(logout());
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          <IconButton onClick={() => setSidebarOpen(true)} color="inherit">
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1, marginLeft: 1 }}>
            E-Commerce
          </Typography>

          {/* Search Bar */}
          <Box sx={{ display: "flex", gap: "10px", marginLeft: "10px" }}>
            <Link to={"/cart"}>
              <IconButton color="inherit">
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>

            {user && user.role === "admin" && (
              <Link to={"/admin/dashboard"}>
                <IconButton color="inherit">
                  <DashboardIcon />
                </IconButton>
              </Link>
            )}

            <Link to={"/profile"}>
              <IconButton color="inherit">
                <AccountCircleIcon />
              </IconButton>
            </Link>

            {/* Logout Button */}
            {user && (
              <Button
                color="inherit"
                onClick={handleLogout}
                sx={{ textTransform: "none" }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Navbar;
