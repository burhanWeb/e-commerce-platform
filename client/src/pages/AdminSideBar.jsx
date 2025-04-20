import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import InventoryIcon from "@mui/icons-material/Inventory";

function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        sx={{ position: "absolute", top: 10, left: 10 }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <div style={{ width: 250, padding: "20px" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography variant="h5" style={{ marginBottom: "20px" }}>
              E-Commerce
            </Typography>
          </Link>
          <Divider />

          <List>
            <ListItem
              button
              component={Link}
              to="/admin/dashboard"
              onClick={() => setOpen(false)}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem
              button
              component={Link}
              to="/admin/orders"
              onClick={() => setOpen(false)}
            >
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>

            <ListItem
              button
              component={Link}
              to="/admin/products"
              onClick={() => setOpen(false)}
            >
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItem>

            <ListItem
              button
              component={Link}
              to="/admin/users"
              onClick={() => setOpen(false)}
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>

            <ListItem
              button
              component={Link}
              to="/admin/createOrders"
              onClick={() => setOpen(false)}
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Create Order" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
}

export default Sidebar;
