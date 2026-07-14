const express = require("express");
const {createJob, getAllJobs,getJobById} = require("../controllers/jobController");
const router = express.Router();

const {
    auth,
    isRecruiter
} = require("../middleware/authMiddleware");


router.post(
    "/create",
    auth,
    isRecruiter,
    createJob
);

router.get("/", getAllJobs);
router.get("/:id", getJobById);

module.exports = router;