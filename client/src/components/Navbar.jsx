import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav
      style={{
        background: "#1e3a8a",
        color: "white",
        padding: "15px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,.2)",
      }}
    >
      <Link
        to="/"
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "28px",
          fontWeight: "bold",
        }}
      >
        CodeArena
      </Link>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <Link style={linkStyle} to="/">
          Home
        </Link>

        {token && user?.role === "candidate" && (
          <>
            <Link style={linkStyle} to="/my-applications">
              My Applications
            </Link>

            <Link style={linkStyle} to="/profile">
              Profile
            </Link>
          </>
        )}

        {token && user?.role === "recruiter" && (
          <>
            <Link style={linkStyle} to="/recruiter">
              Dashboard
            </Link>

            <Link style={linkStyle} to="/create-job">
              Create Job
            </Link>
          </>
        )}

        {!token && (
          <>
            <Link style={linkStyle} to="/login">
              Login
            </Link>

            <Link style={linkStyle} to="/register">
              Register
            </Link>
          </>
        )}

        {token && (
          <button
            onClick={logout}
            style={{
              background: "#ef4444",
              color: "white",
              border: "none",
              padding: "8px 18px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "500",
};