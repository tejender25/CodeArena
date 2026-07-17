import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
} from "../services/userService";

export default function Profile() {
  const [form, setForm] = useState({
    fullName: "",
    skills: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfile();

      const user = res.data.user;

      setForm({
        fullName: user.fullName,
        skills: user.skills.join(","),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProfile({
        fullName: form.fullName,
        skills: form.skills.split(","),
      });

      alert("Profile Updated");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>My Profile</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full Name"
        />

        <br />
        <br />

        <input
          name="skills"
          value={form.skills}
          onChange={handleChange}
          placeholder="React,Node,MongoDB"
        />

        <br />
        <br />

        <button>Save</button>
      </form>
    </div>
  );
}