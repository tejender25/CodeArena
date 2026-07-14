import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };    

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);

      localStorage.setItem("token", res.data.token);

      localStorage.setItem("user",JSON.stringify(res.data.user));

      const role = res.data.user.role;

alert("Login Successful");

if (role === "recruiter") {
  navigate("/recruiter");
} else {
  navigate("/");
}
    } catch (err) {
  console.log("ERROR:", err);
  console.log("RESPONSE:", err.response);
  console.log("DATA:", err.response?.data);

  alert(err.response?.data?.message || err.message);
}
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />

        <br />
        <br />

        <button>Login</button>
      </form>

      <br />

      <Link to="/register">
        Create Account
      </Link>
    </div>
  );
}