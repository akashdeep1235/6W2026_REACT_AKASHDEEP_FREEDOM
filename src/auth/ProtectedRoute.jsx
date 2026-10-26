// src/auth/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from "../Services/AuthService";

export default function ProtectedRoute({ allowedRoles }) {
  const location = useLocation();
  const loggedIn = localStorage.getItem("islogin") === "true" && AuthService.getUid();
  const role = AuthService.getUserType();

  // Not logged in -> go to login
  if (!loggedIn) {
    toast.error("Please login first", { toastId: "auth-guard" });
    return <Navigate to="/userlogin" replace state={{ from: location }} />;
  }

  // Logged in but wrong role -> go home
  if (allowedRoles && !allowedRoles.includes(role)) {
    toast.error("Unauthorised", { toastId: "auth-guard" });
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
