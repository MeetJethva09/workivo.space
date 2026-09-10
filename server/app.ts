import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './config/dbConnection.js';
import userRoutes from './routes/userRoutes.js';
import productionRoutes from './routes/productionRoutes.js';

dotenv.config();
const app = express();


app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);


// 2. Middlewares
app.use(express.json());
app.use(cookieParser());

// 3. DB connection
await connectDB();

// 4. Routes
app.use('/users', userRoutes);
app.use('/production', productionRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
