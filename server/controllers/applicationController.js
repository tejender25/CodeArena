const Application = require("../models/Application");
const Job = require("../models/Job");
const applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applicant = req.user.id;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "Already Applied",
      });
    }

    const application = await Application.create({
      job: jobId,
      applicant,
    });

    res.status(201).json({
      success: true,
      message: "Applied Successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user.id,
    })
      .populate({
        path: "job",
        populate: {
          path: "recruiter",
          select: "fullName email",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getApplicantsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Check if job exists
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Only recruiter who created the job can view applicants
    if (job.recruiter.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    const applications = await Application.find({
      job: jobId,
    })
      .populate("applicant", "fullName email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  applyJob,getMyApplications,getApplicantsForJob
};