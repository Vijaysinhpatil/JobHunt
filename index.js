import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import dotenv from 'dotenv'
import conncetDB from './utils/db.js';
import UserRouter from './routes/user.route.js'
import JobRouter from './routes/job.route.js'
import CompanyRouter from './routes/company.route.js'
const app = express();



// configuring environment variables
dotenv.config({});

//Adding middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());    
const corsOptions = {
    origion : "http://localhost:5173",
    Credentials : true,
}
app.use(cors(corsOptions))


//route section or creating API's

app.use('/api/v1/user' , UserRouter)

// For Job Posting
app.use('/api/v1/job' , JobRouter)

//router registering Company

app.use('/api/v1/company' , CompanyRouter)


const PORT = process.env.PORT || 4000

//calling database connection function
conncetDB(); 
app.listen(PORT , () => {
    console.log(`server is running at POPT ${PORT}`);
} )
