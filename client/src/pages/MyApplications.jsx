import { useEffect, useState } from "react";
import { getMyApplications } from "../services/applicationService";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const res = await getMyApplications();
      setApplications(res.data.applications);
    } catch (err) {
      console.log(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "#22c55e";
      case "Rejected":
        return "#ef4444";
      default:
        return "#f59e0b";
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
      <h1
        style={{
          color: "#1e3a8a",
          marginBottom: "30px",
        }}
      >
        My Applications
      </h1>

      {applications.length === 0 ? (
        <h2>No Applications Yet</h2>
      ) : (
        applications.map((app) => (
          <div
            key={app._id}
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 5px 15px rgba(0,0,0,.08)",
              marginBottom: "20px",
            }}
          >
            {app.job ? (
              <>
                <h2>{app.job.title}</h2>

                <p>🏢 {app.job.company}</p>

                <p>
                  Recruiter: {app.job.recruiter?.fullName || "N/A"}
                </p>
              </>
            ) : (
              <>
                <h2 style={{ color: "#ef4444" }}>Job Deleted</h2>

                <p>This job is no longer available.</p>
              </>
            )}

            <br />

            <span
              style={{
                background: getStatusColor(app.status),
                color: "white",
                padding: "8px 15px",
                borderRadius: "20px",
                fontWeight: "bold",
              }}
            >
              {app.status}
            </span>
          </div>
        ))
      )}
    </div>
  );
}