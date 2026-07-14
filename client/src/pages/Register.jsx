import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "candidate",
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
      const res = await registerUser(form);

      localStorage.setItem("token", res.data.token);

      alert("Registration Successful");

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Full Name"
          name="fullName"
          onChange={handleChange}
        />

        <br />
        <br />

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

        <select
          name="role"
          onChange={handleChange}
        >
          <option value="candidate">Candidate</option>
          <option value="recruiter">Recruiter</option>
        </select>

        <br />
        <br />

        <button>Register</button>
      </form>

      <br />

      <Link to="/login">
        Already have an account?
      </Link>
    </div>
  );
}