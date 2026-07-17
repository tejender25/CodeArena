const express = require("express");
const {createJob, getAllJobs,getJobById,updateJob,deleteJob,getMyJobs,} = require("../controllers/jobController");
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
router.get(
    "/my-jobs",
    auth,
    isRecruiter,
    getMyJobs
);

router.put(
    "/:id",
    auth,
    isRecruiter,
    updateJob
);

router.delete(
    "/:id",
    auth,
    isRecruiter,
    deleteJob
);



router.get("/", getAllJobs);
router.get("/:id", getJobById);

module.exports = router;