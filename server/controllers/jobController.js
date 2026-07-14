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
    const keyword = req.query.keyword || "";
    const page = Number(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    const jobs = await Job.find({
      title: {
        $regex: keyword,
        $options: "i",
      },
    })
      .populate("recruiter", "fullName email")
      .skip(skip)
      .limit(limit);

    const totalJobs = await Job.countDocuments({
      title: {
        $regex: keyword,
        $options: "i",
      },
    });

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalJobs / limit),
      totalJobs,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
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

const updateJob = async (req, res) => {
    try {

        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        if (job.recruiter.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.json({
            success: true,
            updatedJob
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const deleteJob = async (req,res)=>{

    try{

        const job = await Job.findById(req.params.id);

        if(!job){

            return res.status(404).json({
                success:false,
                message:"Job not found"
            });

        }

        if(job.recruiter.toString()!=req.user.id){

            return res.status(403).json({
                success:false,
                message:"Unauthorized"
            });

        }

        await job.deleteOne();

        res.json({

            success:true,

            message:"Job Deleted"

        });

    }
    catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};
module.exports = {
  createJob,getAllJobs,getJobById,updateJob,deleteJob
};