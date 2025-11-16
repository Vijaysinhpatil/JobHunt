import mongoose from 'mongoose';

let isConnected = false; // Track connection status

const connectDB = async () => {
    if (isConnected) {
        console.log("Using existing MongoDB connection");
        return;
    }

    try {
        // Set mongoose options for serverless
        mongoose.set('strictQuery', false);
        
        const db = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000,
        });

        isConnected = db.connections[0].readyState === 1;
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("Error while connecting to MongoDB:", error);
        isConnected = false;
        throw error;
    }
};

export default connectDB;
