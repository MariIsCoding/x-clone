import express, { urlencoded } from 'express';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectMongoDB from './db/connectMongoDB.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/auth', authRoutes)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectMongoDB()
});


