/*
    INSTRUCTION: setup the employer schema according to the following requirements:
    - name: (String, required)
    - industry: (String) - Industry or business sector of the employer
    - email: (String) - Contact email for the employer's hiring team
*/

const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        industry: { type: String, enum:["Industry" , "business"] },
        email: { type: String },
    }
);

module.exports = mongoose.model("Employer", employerSchema);
