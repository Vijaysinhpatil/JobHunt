import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config({})

cloudinary.config({

    cloud_name : process.env.CLD_NAME,
    api_key:process.env.API_NAME,
    api_secret:process.env.API_SECRET

})

export default cloudinary;
