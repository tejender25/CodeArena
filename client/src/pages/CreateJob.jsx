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

      alert("Job Created");

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
    <div style={{ padding: 40 }}>
      <h2>Create Job</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="experience"
          placeholder="Experience"
          value={form.experience}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="skills"
          placeholder="React,Node,MongoDB"
          value={form.skills}
          onChange={handleChange}
        />

        <br /><br />

        <button>Create Job</button>
      </form>
    </div>
  );
}