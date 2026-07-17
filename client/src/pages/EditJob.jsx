import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getJobById,
  updateJob,
} from "../services/jobService";

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    salary: "",
    experience: "",
    skills: "",
  });

  useEffect(() => {
    loadJob();
  }, []);

  const loadJob = async () => {
    const res = await getJobById(id);

    const job = res.data.job;

    setForm({
      title: job.title,
      company: job.company,
      location: job.location,
      description: job.description,
      salary: job.salary,
      experience: job.experience,
      skills: job.skills.join(","),
    });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateJob(id, {
      ...form,
      skills: form.skills.split(","),
    });

    alert("Job Updated");

    navigate("/recruiter");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Edit Job</h1>

      <form onSubmit={handleSubmit}>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="company"
          value={form.company}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="salary"
          value={form.salary}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="experience"
          value={form.experience}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="skills"
          value={form.skills}
          onChange={handleChange}
        />

        <br /><br />

        <button>Update Job</button>

      </form>
    </div>
  );
}