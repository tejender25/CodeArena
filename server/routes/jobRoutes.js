const express = require("express");
const {createJob, getAllJobs} = require("../controllers/jobController");
const router = express.Router();

const {
    auth,
    isRecruiter
} = require("../middleware/authMiddleware");

const {
    createJob
} = require("../controllers/jobController");

router.post(
    "/create",
    auth,
    isRecruiter,
    createJob
);

router.get("/", getAllJobs);

module.exports = router;