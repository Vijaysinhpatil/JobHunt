import { Job } from "../models/job.model.js";
export const postJob = async(req , res) => {
    try {
        const {
            title,
            description,
            requirements,
            salary,
            experience,
            location,
            jobType,
            position,
            companyId,
           
        } = req.body;

        const userId = req.id;
        console.log("Company" , companyId);
        

        if(!title || !description || !requirements || !salary || !experience || !location ||
            !jobType || !position || !companyId )  {
  
                return res.status(400).json({
                    message : "All fields are required",
                    success : false
                })
        }

       
        // ✅ Fixed: Proper type conversions
        const job = await Job.create({
         
            title,
            description,
            requirements: requirements.split(",").map(req => req.trim()), // Remove extra spaces
            salary: Number(salary),
            location,
            jobType,
            position: Number(position), // ✅ Convert to number
            experienceLevel: Number(experience), // ✅ Convert to number
            company: companyId,
            created_by: userId

        })
       
        await job.save()


        console.log("Posted Job => ", job);
        
        return res.status(201).json({
            message: " New Job created successfully",
            job,
            success: true,
        })
    } catch (error) {
        console.log("Error while Posting Job:", error);
        console.log("Error message:", error.message);

        return res.status(500).json({
            message: "Error while posting job",
            error: error.message,
            success: false
        })
    }
}

//Get All Jobs

export const GetJobs = async(req , res) => {

    try {
        
        const keyword = req?.query?.keyword?.trim() || "";

        console.log("Key Word" , keyword);
        
        const query = keyword ? {

            $or : [
                {
                    title : { $regex : keyword , $options : "i"},
                },
                {
                    description : {$regex : keyword , $options : "i"}
                }
            ]
        } : {}

        const jobs = await Job.find(query)
        .populate({
            path : "company"
        })
        .sort({
            createdAt : -1
        });

        console.log("JOBS =>" , jobs);
        
        if(!jobs)
        {
            return res.status(401).json({
                message : "Not able to get the job properly or Jobs are Not found",
                success : false
            })
        }

        return res.status(201).json({
            message : "Jobs are displayed successfully",
            jobs,
            success : true
        })


    } catch (error) {

        console.log("Error while Getting Jobs" , error);

        return res.status(500).json({
            message : "Error while getting Jobs",
            success : false
        })
        
        
    }
}

//get the job by id

export const GetJobById = async(req , res) => {

    try {
        
        const JobId = req.params.id;

        const jobs = await Job.findById(JobId)
        .populate({
            path : 'applications'
        })

        console.log("JOB ID =>" , JobId);
        console.log("JOBS =>" , jobs);
        
        

        if(!jobs)
        {
            return res.status(401).json({
                message : "Job Not Found",
                success : false
            })
        }

        return res.status(201).json({
            message : "Jobs Are displayed Successfully by their Id",
            jobs,
            success : true
        })
    } catch (error) {
        console.log("Error While getting Job by its Id");

         return res.status(501).json({
                message :"Error While getting Job by its Id",
                success : false
            })
        
    }
}

//keep track of jobs which are updated by current Logged In Admin


export const getAdminJob = async (req, res) => {
  try {
    const AdminId = req.id;

    console.log(AdminId);
    
    const jobs = await Job.find({
      created_by: AdminId,  // Convert string -> ObjectId
    })
      .populate("company")   // only path needed
      .sort({ createdAt: -1 });  // fix sorting (was misplaced inside populate)

    console.log("Jobs =>", jobs);

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "No jobs found for this admin",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Jobs successfully fetched for this Admin",
      jobs,
      success: true,
    });
  } catch (error) {
    console.log("Error while fetching Jobs by Admin", error);

    return res.status(500).json({
      message: "Error while fetching Jobs by Admin",
      success: false,
    });
  }
};
