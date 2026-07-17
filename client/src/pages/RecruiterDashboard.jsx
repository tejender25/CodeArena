import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyJobs, deleteJob } from "../services/jobService";

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
    <div style={{ padding: 40 }}>
      <h1>Recruiter Dashboard</h1>

      <Link to="/create-job">
        <button>Create New Job</button>
      </Link>

      <br />
      <br />

      {jobs.length === 0 ? (
        <h3>No Jobs Posted Yet</h3>
      ) : (
        jobs.map((job) => (
          <div
            key={job._id}
            style={{
              border: "1px solid gray",
              padding: 20,
              marginBottom: 20,
              borderRadius: 8,
            }}
          >
            <h2>{job.title}</h2>

            <p>
              <strong>Company:</strong> {job.company}
            </p>

            <p>
              <strong>Location:</strong> {job.location}
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              <Link to={`/applicants/${job._id}`}>
                <button>Applicants</button>
              </Link>

              <Link to={`/edit-job/${job._id}`}>
                <button>Edit</button>
              </Link>

              <button
                onClick={() => handleDelete(job._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}