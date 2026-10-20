/*
    INSTRUCTION: setup the job routes according to the following requirements:
    - `GET /jobs`: List all jobs with sorting, pagination and filtering
    - `GET /jobs/:id`: Get a specific job by its id
    - `POST /jobs`: Add a new job
    - `PUT /jobs/:id`: Update a job
    - `DELETE /jobs/:id`: Delete a job
*/

const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job");

router.get("/", jobController.getJobs);
router.get("/:id", jobController.getjob);
router.post("/", jobController.addNewJob);
router.put("/:id", jobController.updateJob);
router.delete("/:id", jobController.deleteJob);

router.get("/sort",jobController.getJobByCategoty)

module.exports = router;
