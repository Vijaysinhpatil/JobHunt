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

dotenv.config({});

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());   

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://jobhunt-frontend-rho.vercel.app",
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
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Health check route
app.get('/', (req, res) => {
  res.json({ status: 'Server is running', success: true });
});

// Routes
app.use('/api/v1/user', UserRouter)
app.use('/api/v1/job', JobRouter)
app.use('/api/v1/company', CompanyRouter)
app.use('/api/v1/application', ApplicationRoute)
app.use('/api/v1', FeedBackRoute)

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await connectDB();
    
    // Only listen in local development
    if (process.env.NODE_ENV !== 'production') {
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    }
  } catch (error) {
    console.error('Failed to connect to database:', error);
  }
};

startServer();

// Export for Vercel
export default app;
