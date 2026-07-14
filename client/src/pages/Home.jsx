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
    <div style={{ padding: 40 }}>
      <div style={{ marginBottom: 30 }}>

    <Link to="/my-applications">
        My Applications
    </Link>

</div>  
      <h1>Available Jobs</h1>

      <br />

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
        border: "1px solid gray",
        marginBottom: 20,
        padding: 20,
        cursor: "pointer",
      }}
    >
      <h2>{job.title}</h2>

      <h3>{job.company}</h3>

      <p>{job.location}</p>

      <p>{job.experience}</p>

      <p>₹{job.salary}</p>
    </div>
  </Link>
))}
    </div>
  );
}