
import { Application } from '../models/application.model.js'
import { Job } from '../models/job.model.js' 


export const applyJob = async(req , res) => {

    try {
        
        
    const jobId = req.params.jobId;   // 👈 FIXED
    const userId = req.id;            // 👈 from auth middleware (logged-in user)

    console.log("Job ID => " , jobId);
    console.log("User Id => " , userId);
    
    
        if(!jobId)
        {
            return res.status(400).json({
                message : "Job Not found",
                success : false
            })
        }

        //check wheather an user is applied or not

        const existingApplication = await Application.findOne({
             
            job : jobId,
            applicant  : userId

        })

        if(existingApplication)
        {
            return res.status(404).json({

                message : "You Are already Applied For this Job",
                success : false

            })
        }

        const job = await Job.findById(jobId);
         console.log(job);
         
        if(!job)
        {
            return res.status(400).json({
                message : "Job Not Found",
                success : false
            })
        }

        //create New Job

        const newApplication = await Application.create({

            job : jobId,
            applicant : userId

        })

        job.applications.push(newApplication._id);
        await job.save()

        return res.status(200).json({
            message : "Successfully applied For the job",
            success : true
        })
    } catch (error) {
        
        console.log("Error while Applying for the job");

        return res.status(400).json({

            message : "Error while applying for the job ",
            success : false
        })
        
    }
}

//get the deatils of applied job which are applied by the user

export const getAppliedJobs = async(req , res) => {

    try {
        
        const userId = req.id;

        const application = await Application.find({ applicant : userId})
        .sort({ createdAt : -1})
        .populate({

            path : "job",
            options : {sort : {createdAt : -1}},

            populate : {

                path : "company",
                options : {
                    sort : { createdAt : -1},
                }
            }
        })

        if(!application)
        { 
                return res.status(401).json({

                    message : "No Application Found",
                    success : false
                })
        }

        return res.status(200).json({

            message : "Applied Jobs Are here",
            application,
            success : true
        })
    } catch (error) {
        
        console.log("Error while getting applied Jobs by a perticular user");

        return res.status(500).json({
            message : "Error while getting applied Jobs by a perticular User",
            success : false
        })
    }
}


//admin checks  how many users is applied to hosted jobs

export const getApplicant = async(req , res) => {

    try {
        
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path : "applications",
            options : {
                sort : { createdAt : -1 }
            },
            populate : {
                path : "applicant"
            }
        })

        if(!job)
        {
            return res.status(404).json({
                message : "Job Not Found",
                success : false
            })
        }

        return res.status(200).json({
            message : "Hosted Jobs Are here",
            job,
            success : true
        })
    } catch (error) {
        
         console.log("Error at getApplications", error);

            return res.status(500).json({
            message: "Error At getApplications",
             error: error.message
            });

    }
}

//update status from the applications model

export const updateStatus = async(req , res) => {

    try {
        
        const { status } = req.body;
        const applicationId = req.params.id;
 
        console.log(applicationId);
        

        if(!status)
        {
            return res.status(404).json({
                message : "Status Not Found",
                success : false
            })
        }

        //find applications by their Id's

        const application = await Application.findById(applicationId)

        if(!application)
        {
            return res.status(404).json({

                message : "Application Not Found",
                success : false

            })
        }

        //update the status

        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            success : "Status Updated Successfully",
        })
    } catch (error) {
        
        console.log("Error At UpdateStatus" , error);

           return res.status(404).json({
              message: "Error At updateStatus",
           }); 
        
    }
}