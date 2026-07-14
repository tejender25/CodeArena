import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobById } from "../services/jobService";
import { Link } from "react-router-dom";
import { applyJob } from "../services/applicationService";

export default function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {
    loadJob();
  }, []);

  const handleApply = async () => {
    try {

        await applyJob(id);

        alert("Applied Successfully");

    } catch(err){

        alert(err.response?.data?.message);

    }
};

  const loadJob = async () => {
    try {
      const res = await getJobById(id);
      setJob(res.data.job);
    } catch (err) {
      console.log(err);
    }
  };

  if (!job) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>{job.title}</h1>

      <h2>{job.company}</h2>

      <p>
        <b>Location:</b> {job.location}
      </p>

      <p>
        <b>Salary:</b> ₹{job.salary}
      </p>

      <button onClick={handleApply}> Apply Now </button>

      <p>
        <b>Experience:</b> {job.experience}
      </p>

      <p>
        <b>Description:</b>
      </p>

      <p>{job.description}</p>

      <h3>Skills</h3>

      <ul>
        {job.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>

      <Link to={`/apply/${job._id}`}>
    <button>Apply Now</button>
</Link>
    </div>
  );
}