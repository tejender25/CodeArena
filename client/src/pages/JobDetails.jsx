import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getJobById } from "../services/jobService";

export default function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {
    loadJob();
  }, []);

  const loadJob = async () => {
    try {
      const res = await getJobById(id);
      setJob(res.data.job);
    } catch (err) {
      console.log(err);
    }
  };

  if (!job) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "80px" }}>
        Loading...
      </h2>
    );
  }

  return (
    <div
      style={{
        background: "#f5f7fb",
        minHeight: "100vh",
        padding: "40px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "850px",
          background: "white",
          padding: "35px",
          borderRadius: "12px",
          boxShadow: "0 5px 20px rgba(0,0,0,.1)",
        }}
      >
        <h1
          style={{
            color: "#1e3a8a",
            marginBottom: "10px",
          }}
        >
          {job.title}
        </h1>

        <h2
          style={{
            color: "#444",
            marginBottom: "25px",
          }}
        >
          🏢 {job.company}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "15px",
            marginBottom: "30px",
          }}
        >
          <p>
            <strong>📍 Location:</strong> {job.location}
          </p>

          <p>
            <strong>💰 Salary:</strong> ₹{job.salary}
          </p>

          <p>
            <strong>🧠 Experience:</strong> {job.experience}
          </p>

          <p>
            <strong>💼 Job Type:</strong> {job.jobType}
          </p>
        </div>

        <h3>Description</h3>

        <p
          style={{
            lineHeight: "1.8",
            color: "#555",
          }}
        >
          {job.description}
        </p>

        <h3 style={{ marginTop: "30px" }}>
          Required Skills
        </h3>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "15px",
          }}
        >
          {job.skills.map((skill) => (
            <span
              key={skill}
              style={{
                background: "#dbeafe",
                color: "#1e3a8a",
                padding: "8px 15px",
                borderRadius: "20px",
                fontWeight: "bold",
              }}
            >
              {skill}
            </span>
          ))}
        </div>

        <Link to={`/apply/${job._id}`}>
          <button
            style={{
              marginTop: "35px",
              width: "100%",
              padding: "15px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "17px",
              fontWeight: "bold",
            }}
          >
            Apply Now
          </button>
        </Link>
      </div>
    </div>
  );
}