import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getApplicants,
  updateStatus,
} from "../services/applicationService";

export default function Applicants() {
  const { id } = useParams();

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadApplicants();
  }, []);

  const loadApplicants = async () => {
    try {
      const res = await getApplicants(id);
      setApplications(res.data.applications);
    } catch (err) {
      console.log(err);
    }
  };

  const changeStatus = async (applicationId, status) => {
    try {
      await updateStatus(applicationId, status);

      alert("Status Updated");

      loadApplicants();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
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
        Applicants
      </h1>

      {applications.length === 0 ? (
        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 5px 15px rgba(0,0,0,.08)",
          }}
        >
          <h2>No Applicants Yet</h2>
        </div>
      ) : (
        applications.map((app) => (
          <div
            key={app._id}
            style={{
              background: "white",
              padding: "25px",
              marginBottom: "20px",
              borderRadius: "12px",
              boxShadow: "0 5px 15px rgba(0,0,0,.08)",
            }}
          >
            <h2>{app.applicant.fullName}</h2>

            <p>{app.applicant.email}</p>

            <p>
              <strong>Status:</strong> {app.status}
            </p>

            {app.resume && (
              <a
                href={app.resume}
                target="_blank"
                rel="noreferrer"
              >
                <button
                  style={{
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  View Resume
                </button>
              </a>
            )}

            <button
              onClick={() =>
                changeStatus(app._id, "Accepted")
              }
              style={{
                background: "#22c55e",
                color: "white",
                border: "none",
                padding: "10px 16px",
                borderRadius: "8px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Accept
            </button>

            <button
              onClick={() =>
                changeStatus(app._id, "Rejected")
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
              Reject
            </button>
          </div>
        ))
      )}
    </div>
  );
}