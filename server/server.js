// server/server.js
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from "./routes/productRoutes.js";


// Configure environment variables
dotenv.config();

// Database connection (We will create this file next)
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Allows us to send JSON data
app.use("/api/v1/product", productRoutes);

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