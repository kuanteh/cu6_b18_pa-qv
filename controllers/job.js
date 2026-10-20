/*
    INSTRUCTION: setup the job controller with the following functions:
    - getJobs - Retrieve all jobs (use `populate()` to get employer details)
    - getJob - Retrieve a specific job (use `populate()` to get employer details)
    - addNewJob - Add a new job
    - updateJob - Update a job
    - deleteJob - Delete a job
*/
const Job = require("../models/job");
const Employer = require("../models/employer");

exports.getJobs = async (req, res) => {
    try {
        const Jobs = await Job.find().populate("employer");
        res.json(Jobs);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getjob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate("employer");
        if (!job) return res.status(404).json({ message: "Appointment not found" });
        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.addNewJob = async (req, res) => {
    try {
        if (req.body.employer && !(await Employer.exists({ _id: req.body.employer }))) {
            return res.status(400).json({ message: "Employer not found" });
        }
        const job = await Job.create(req.body);
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateJob = async (req, res) => {
    try {
        if (req.body.employer && !(await Employer.exists({ _id: req.body.employer }))) {
            return res.status(400).json({ message: "Employer not found" });
        }
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            // runValidators:true,
        }).populate("employer");
        if (!job) return res.status(404).json({ message: "Job not found" });
        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });
        res.status(200).json({ message: "Appointment deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getJobByCategoty = async (req, res) => {
    const { category, sort, order = 1 } = req.query;

    const sortOptions = {};
    if (sort && order) {
        if (sort == "Engineering") {
            sortOptions.price = Number(order);
        }
        if (sort == "Operations") {
            sortOptions.name = Number(order);
        }
    }
    const job = await Job.find({ category: category }).sort(sortOptions);
    res.json(job);
};