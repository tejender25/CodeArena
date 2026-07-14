const Job = require("../models/Job");

const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      description,
      salary,
      experience,
      jobType,
      skills,
    } = req.body;

    if (
      !title ||
      !company ||
      !location ||
      !description ||
      !salary ||
      !experience
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const job = await Job.create({
      title,
      company,
      location,
      description,
      salary,
      experience,
      jobType,
      skills,
      recruiter: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Job Created Successfully",
      job,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllJobs = async (req, res) => {
    try {

        const jobs = await Job.find()
            .populate("recruiter", "fullName email");

        res.status(200).json({
            success: true,
            jobs
        });

    } catch (error) {

        res.status(500).json({
            success:false,
            message:error.message
        });

    }
};

const getJobById = async (req, res) => {

    try {

        const job = await Job.findById(req.params.id)
            .populate("recruiter", "fullName email");

        if (!job) {

            return res.status(404).json({
                success: false,
                message: "Job not found"
            });

        }

        res.status(200).json({
            success: true,
            job
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
  createJob,getAllJobs,getJobById
};