# CU6_B18_PA

exports.getApplicationsByJob = async (req, res) => {
    try {
        const { id: jobId } = req.params;

        if (!jobId) {
            return res.status(400).json({ message: "Error: Job ID is required in the request parameters." });
        }

        try {
]            const applications = await Application.find({ job: jobId })
                .populate('job', 'title description companyName') // 只选择需要显示的 job 字段进行回填
                .exec();

            if (!applications || applications.length === 0) {
                return res.status(200).json({ 
                    message: "No applications found for this job.",
                    data: [] 
                });
            }

]            res.status(200).json({
                message: `Successfully retrieved ${applications.length} applications for Job ID ${jobId}.`,
                data: applications
            });

        } catch (error) {
            console.error("Error fetching applications by job:", error);
            res.status(500).json({ message: "Internal Server Error while retrieving applications." });
        }

    } catch (error) {
        // 捕获其他流程控制错误 (如参数校验失败等)
        console.error("General controller error:", error);
        res.status(400).json({ message: error.message || "Bad request format." });
    }
};
