import connectDB from '../utils/db.js';

export const ensureDbConnection = async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error('Database connection failed:', error);
        return res.status(503).json({
            success: false,
            message: 'Database connection failed. Please try again.',
            error: error.message
        });
    }
};
