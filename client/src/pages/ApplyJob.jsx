import { useParams, useNavigate } from "react-router-dom";
import { applyJob } from "../services/applicationService";

export default function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleApply = async () => {
    try {
      await applyJob(id);

      alert("Applied Successfully");

      navigate("/my-applications");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Apply Job</h1>

      <button onClick={handleApply}>
        Confirm Apply
      </button>
    </div>
  );
}