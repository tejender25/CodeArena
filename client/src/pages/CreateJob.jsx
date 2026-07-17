import { useState } from "react";
import { createJob } from "../services/jobService";

export default function CreateJob() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    salary: "",
    experience: "",
    jobType: "Full-Time",
    skills: "",
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
      await createJob({
        ...form,
        skills: form.skills.split(","),
      });

      alert("Job Created Successfully!");

      setForm({
        title: "",
        company: "",
        location: "",
        description: "",
        salary: "",
        experience: "",
        jobType: "Full-Time",
        skills: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "650px",
          background: "#fff",
          padding: "35px",
          borderRadius: "12px",
          boxShadow: "0 5px 20px rgba(0,0,0,.12)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#1e3a8a",
            marginBottom: "30px",
          }}
        >
          Create New Job
        </h1>

        <label>Job Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>Company</label>
        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>Location</label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="5"
          style={textareaStyle}
        />

        <label>Salary</label>
        <input
          name="salary"
          value={form.salary}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>Experience</label>
        <input
          name="experience"
          value={form.experience}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>Job Type</label>
        <select
          name="jobType"
          value={form.jobType}
          onChange={handleChange}
          style={inputStyle}
        >
          <option>Full-Time</option>
          <option>Part-Time</option>
          <option>Internship</option>
          <option>Remote</option>
        </select>

        <label>Skills (comma separated)</label>
        <input
          name="skills"
          placeholder="React, Node.js, MongoDB"
          value={form.skills}
          onChange={handleChange}
          style={inputStyle}
        />

        <button
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "14px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Create Job
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  marginBottom: "18px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px",
  boxSizing: "border-box",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical",
};