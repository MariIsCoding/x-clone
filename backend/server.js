import express from 'express';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';
import connectMongoDB from './db/connectMongoDB.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;


app.use('/api/auth', authRoutes)

app.listen(8000, () => {
    console.log(`Server running on port ${PORT}`);
    connectMongoDB()
});

