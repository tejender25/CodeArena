import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyJobs } from "../services/jobService";
import { deleteJob } from "../services/jobService";

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
  try {
    const res = await getMyJobs();

    console.log("API Response:", res.data);

    setJobs(res.data.jobs);

    console.log("Jobs:", res.data.jobs);
  } catch (err) {
    console.log(err);
  }
};

   const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this job?"
  );

  if (!confirmDelete) return;

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

      {jobs.map((job) => (
  <div
    key={job._id}
    style={{
      border: "1px solid gray",
      padding: 20,
      marginBottom: 20,
    }}
  >
    <h2>{job.title}</h2>

    <p>{job.company}</p>

    <p>{job.location}</p>

    <div
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "10px",
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

    {" "}

    <Link to={`/edit-job/${job._id}`}>
      <button>Edit</button>
    </Link>

    {" "}

    <button onClick={() => handleDelete(job._id)}>
      Delete
    </button>
  </div>
))}
    </div>
  );
}