/*
    INSTRUCTION: setup the controller functions to handle job applications
    - getApplicationsByJob - Retrieve all applications for a specific job (use `populate()` to get job details)
    - createApplication - Create a new application for a job (ensure no duplicate applications for the same email and job)
*/
const Application = require("../models/application");
const Job = require("../models/job");

exports.getApplicationsByJob = async (req, res) => {
    try {
        const { job } = req.query;
        if (!job) return res.status(400).json({ message: "Job ID is required" });

        const applications = await Application.find({ job }).populate("job");
        res.status(200).json(applications);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.createApplication = async (req, res) => {
    try {
        const { job, email } = req.body;
        if (!job) return res.status(400).json({ message: "Job ID is required" });

        if (!(await Job.exists({ _id: job }))) {
            return res.status(404).json({ message: "Job not found" });
        }

        if (await Application.exists({ job, email })) {
            return res.status(409).json({ message: "You have already applied for this job" });
        }

        const application = await Application.create(req.body);
        res.status(201).json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

