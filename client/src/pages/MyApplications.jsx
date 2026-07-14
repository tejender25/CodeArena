import { useEffect, useState } from "react";
import { getMyApplications } from "../services/applicationService";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    const res = await getMyApplications();
    console.log(res.data);

    setApplications(res.data.applications);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>My Applications</h1>

      {applications
  .filter((app) => app.job)
  .map((app) => (
        <div
          key={app._id}
          style={{
            border: "1px solid gray",
            padding: 20,
            marginBottom: 20,
          }}
        >
          <h2>{app.job.title}</h2>

          <p>{app.job.company}</p>

          <p>Status : {app.status}</p>
        </div>
      ))}
    </div>
  );
}