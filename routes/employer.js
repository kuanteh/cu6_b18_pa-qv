/*
    INSTRUCTION: setup the routes for the employer entity according to the following requirements:
    - `GET /employers`: List all employers
    - `GET /employers/:id`: Get a specific employer by its id
    - `POST /employers`: Add a new employer
    - `PUT /employers/:id`: Update an employer
    - `DELETE /employers/:id`: Delete an employer
*/
const express = require("express");
const router = express.Router();
const employerController = require("../controllers/employer");

router.get("/", employerController.getEmployers);
router.get("/:id", employerController.getEmployer);
router.post("/", employerController.addNewEmployer);
router.put("/:id", employerController.updateEmployer);
router.delete("/:id", employerController.deleteEmployer);

module.exports = router;