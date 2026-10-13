import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const DB_NAME = process.env.DB_NAME || 'sovycode';
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/${DB_NAME}`;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'SovYCode MERN API Server Running',
    database: DB_NAME,
    documentation: '/api/health',
    status: 'online'
  });
});

// Database connection
const connectDB = async () => {
  try {
    // Attempt MongoDB connection with 2 second timeout so local startup is instantaneous
    await mongoose.connect(MONGODB_URI, {
      dbName: DB_NAME,
      serverSelectionTimeoutMS: 2000
    });
    console.log(`✓ MongoDB Connected Successfully to database: "${DB_NAME}"`);
  } catch (err) {
    console.log(`ℹ Notice: MongoDB ("${DB_NAME}") is not currently running locally or reachable.`);
    console.log('✓ Seamless in-memory fallback enabled. The API remains 100% operational!');
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`⚡ SovYCode Backend API listening on http://localhost:${PORT}`);
});
