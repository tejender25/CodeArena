import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getMyJobs,
  deleteJob,
} from "../services/jobService";

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const res = await getMyJobs();
      setJobs(res.data.jobs);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);

      alert("Job Deleted Successfully");

      loadJobs();
    } catch (err) {
      alert(err.response?.data?.message || "Delete Failed");
    }
  };

  return (
    <div
      style={{
        background: "#f5f7fb",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <div>
          <h1
            style={{
              color: "#1e3a8a",
              marginBottom: "5px",
            }}
          >
            Recruiter Dashboard
          </h1>

          <p style={{ color: "#666" }}>
            Manage all your job postings.
          </p>
        </div>

        <Link to="/create-job">
          <button
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            + Create Job
          </button>
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 5px 15px rgba(0,0,0,.08)",
          }}
        >
          <h2>No Jobs Posted Yet</h2>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(380px,1fr))",
            gap: "25px",
          }}
        >
          {jobs.map((job) => (
            <div
              key={job._id}
              style={{
                background: "white",
                padding: "25px",
                borderRadius: "12px",
                boxShadow:
                  "0 5px 15px rgba(0,0,0,.08)",
              }}
            >
              <h2
                style={{
                  color: "#1e3a8a",
                  marginBottom: "15px",
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
                <strong>💰 Salary:</strong> ₹
                {job.salary}
              </p>

              <p>
                <strong>🧠 Experience:</strong>{" "}
                {job.experience}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "20px",
                }}
              >
                <Link to={`/applicants/${job._id}`}>
                  <button
                    style={{
                      background: "#2563eb",
                      color: "white",
                      border: "none",
                      padding: "10px 16px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Applicants
                  </button>
                </Link>

                <Link to={`/edit-job/${job._id}`}>
                  <button
                    style={{
                      background: "#f59e0b",
                      color: "white",
                      border: "none",
                      padding: "10px 16px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                </Link>

                <button
                  onClick={() =>
                    handleDelete(job._id)
                  }
                  style={{
                    background: "#ef4444",
                    color: "white",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}