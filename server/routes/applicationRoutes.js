const express = require("express");

const router = express.Router();

const { auth, isRecruiter } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
    applyJob,
    getMyApplications,
    getApplicantsForJob,
    updateApplicationStatus
} = require("../controllers/applicationController");

router.post(
    "/apply/:jobId",
    auth,
    upload.single("resume"),
    applyJob
);

router.get(
    "/my-applications",
    auth,
    getMyApplications
);

router.get(
    "/job/:jobId",
    auth,
    isRecruiter,
    getApplicantsForJob
);

router.patch(
    "/status/:applicationId",
    auth,
    isRecruiter,
    updateApplicationStatus
);

module.exports = router;