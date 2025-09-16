import mongoose from "mongoose";
const companySchema = new mongoose.Schema({

    CompanyName : {

        type : String,
        required : true,
        unique : true
    },
    desciption : {

        type : String
    },
    website : {

        type : String

    },
    logo : {
        type : String
    },
    location : {

        type : String
    },
    userId : {

        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true

    }
})
export const Company = mongoose.model("company" , companySchema)