import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      style={{
        padding: "20px",
        borderBottom: "1px solid gray",
        display: "flex",
        gap: "20px",
      }}
    >
      <Link to="/">Home</Link>

      {!token && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

      {token && user?.role === "candidate" && (
        <>
          <Link to="/my-applications">
            My Applications
          </Link>
        </>
      )}

      {token && user?.role === "recruiter" && (
        <>
          <Link to="/recruiter">
            Recruiter Dashboard
          </Link>
        </>
      )}

      {token && (
        <button onClick={logout}>
          Logout
        </button>
      )}
    </div>
  );
}