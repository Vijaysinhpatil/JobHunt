import mongoose from "mongoose";

const application_schema = new mongoose.Schema({

    job : {

        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Job"

    },
    applicant : {

        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    status : {

        type : String,
        enum : ["pending","accepted","rejected"],
        default : "pending"
    }
})

export const Application = mongoose.model("Application" , application_schema)