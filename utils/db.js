import mongoose from 'mongoose';

const conncetDB = async() => {
   
    try {

         await mongoose.connect(process.env.MONGO_URI)

         console.log("MongoDB connected successfully");
         
    }catch (error) {
        console.log("Error while connecting to mongoDB", error);
    }
}
export default conncetDB;