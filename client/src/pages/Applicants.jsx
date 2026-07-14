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
      loadApplicants();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Applicants</h1>

      {applications.map((app) => (
        <div
          key={app._id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "20px",
          }}
        >
          <h2>{app.applicant.fullName}</h2>

          <p>{app.applicant.email}</p>

          <p>Status : {app.status}</p>

          <button
            onClick={() =>
              changeStatus(app._id, "Accepted")
            }
          >
            Accept
          </button>

          <button
            onClick={() =>
              changeStatus(app._id, "Rejected")
            }
          >
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}