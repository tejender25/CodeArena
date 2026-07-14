import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  recruiterOnly = false,
}) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (recruiterOnly && (!user || user.role !== "recruiter")) {
    return <Navigate to="/" />;
  }

  return children;
}