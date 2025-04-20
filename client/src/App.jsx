import "./App.css";
import { AdminLayout, AdminRoute, Cart, Navbar } from "./components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AuthLayout,
  CheckOut,
  Home,
  Login,
  MainLayout,
  MyOrders,
  ProductsPage,
  Profile,
  Signup,
  SingleProductPage,
  UpdatePassword,
  UpdateProfile,
  Dashboard,
  AdminProducts,
  AdminOrders,
  AdminUsers,
  CreateProduct,
  AdminSideBar,
  OrderSucess,
} from "./pages";
import { ProtectedRoute } from "./components/";
import { getUserFromLocalStorage } from "./utils/localStorage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
          </Route>
          <Route path="/product/:id" element={<SingleProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/payment-success" element={<OrderSucess />} />
          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/products" element={<AdminProducts />} />

              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/createOrders" element={<CreateProduct />} />
            </Route>
          </Route>
        </Route>

        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
