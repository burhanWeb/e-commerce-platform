import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { user } = useSelector((state) => state.auth);
  if (!user) return <Navigate to="/login" />;

  return user.role === "admin" ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;
