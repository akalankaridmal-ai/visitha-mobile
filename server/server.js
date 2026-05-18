// server/server.js
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import connectDB from './config/db.js';

// Route imports
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoute.js"; 

// Configure environment variables
dotenv.config();

// Database connection
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Allows us to send JSON data

// API Routes
app.use("/api/v1/auth", authRoutes);       // Auth module endpoints
app.use("/api/v1/product", productRoutes);   // Product module endpoints

// Base Route
app.get('/', (req, res) => {
    res.send({
        message: "Welcome to Visitha Mobile Server"
    });
});

// Port configuration
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server Running on mode ${process.env.DEV_MODE} on port ${PORT}`.bgCyan.white);
});