import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { applyJob } from "../services/applicationService";

export default function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (resume) {
      formData.append("resume", resume);
    }

    try {
      await applyJob(id, formData);

      alert("Applied Successfully");

      navigate("/my-applications");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Apply Job</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setResume(e.target.files[0])
          }
        />

        <br />
        <br />

        <button>Apply</button>

      </form>
    </div>
  );
}