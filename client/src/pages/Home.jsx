import { useEffect, useState } from "react";
import { getJobs } from "../services/jobService";
import { Link } from "react-router-dom";

export default function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const res = await getJobs();
      setJobs(res.data.jobs);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        background: "#f5f7fb",
        minHeight: "100vh",
      }}
    >
      {/* Hero Section */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "50px",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            color: "#1e3a8a",
            marginBottom: "10px",
          }}
        >
          Find Your Dream Job
        </h1>

        <p
          style={{
            color: "#555",
            fontSize: "18px",
          }}
        >
          Explore the latest opportunities from top companies.
        </p>
      </div>

      {/* Jobs */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: "25px",
        }}
      >
        {jobs.map((job) => (
          <Link
            key={job._id}
            to={`/job/${job._id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "25px",
                boxShadow:
                  "0 5px 15px rgba(0,0,0,.08)",
                transition: ".3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-5px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0px)";
              }}
            >
              <h2
                style={{
                  color: "#1e3a8a",
                  marginBottom: "10px",
                }}
              >
                {job.title}
              </h2>

              <p>
                <strong>🏢 Company:</strong>{" "}
                {job.company}
              </p>

              <p>
                <strong>📍 Location:</strong>{" "}
                {job.location}
              </p>

              <p>
                <strong>💼 Experience:</strong>{" "}
                {job.experience}
              </p>

              <p>
                <strong>💰 Salary:</strong> ₹
                {job.salary}
              </p>

              <button
                style={{
                  marginTop: "15px",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                View Details →
              </button>
            </div>
          </Link>
        ))}
      </div>

      {jobs.length === 0 && (
        <h2
          style={{
            textAlign: "center",
            marginTop: "60px",
            color: "#777",
          }}
        >
          No Jobs Available
        </h2>
      )}
    </div>
  );
}