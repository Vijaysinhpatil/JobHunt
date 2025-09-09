import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({

    title : {
        type : String,
        required : true,
    },

     description : {
        type  : String ,
        required : true,
    },

    requirements : {
        type : Number,
    },

    salary : {
        type : Number,
        required : true,
   },

   experienceLevel : {
    type : Number ,
    required : true
   },

   location : {
    tyope : String,
    required : true,
   },

   jobType : {
    type : String,
    required : true
   },

   position : {
    type : String ,
    required : true 
    },

    company : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
  },
  applications : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "application"
  }]

} , {timestamps : true})

export const Job = mongoose.model('Job', jobSchema);