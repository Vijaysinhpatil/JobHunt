import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './utils/db.js';
import UserRouter from './routes/user.route.js'
import JobRouter from './routes/job.route.js'
import CompanyRouter from './routes/company.route.js'
import ApplicationRoute from "./routes/application.route.js"
import FeedBackRoute from './routes/contact.route.js'
const app = express();



// configuring environment variables
dotenv.config({});

//Adding middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());   

// middlewares
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL 
  
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed from this origin"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));


//route section or creating API's

app.use('/api/v1/user' , UserRouter)

// For Job Posting
app.use('/api/v1/job' , JobRouter)

//router registering Company

app.use('/api/v1/company' , CompanyRouter)

//application Route
app.use('/api/v1/application' , ApplicationRoute)

//FeedBack Route
app.use('/api/v1' , FeedBackRoute)
const PORT = process.env.PORT || 4000

//calling database connection function
connectDB(); 
app.listen(PORT , () => {
    console.log(`server is running at POPT ${PORT}`);
} )
