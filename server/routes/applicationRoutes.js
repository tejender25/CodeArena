const express = require("express");

const router = express.Router();

const { auth,isRecruiter } = require("../middleware/authMiddleware");

const {applyJob,getMyApplications,getApplicantsForJob} = require("../controllers/applicationController");

router.post("/apply/:jobId", auth, applyJob);
router.get("/my-applications",auth,getMyApplications);
router.get(
  "/job/:jobId",
  auth,
  isRecruiter,
  getApplicantsForJob
);
module.exports = router;