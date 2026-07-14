const express = require("express");
const {createJob, getAllJobs,getJobById,updateJob} = require("../controllers/jobController");
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

router.put(
    "/:id",
    auth,
    isRecruiter,
    updateJob
);

router.get("/", getAllJobs);
router.get("/:id", getJobById);

module.exports = router;