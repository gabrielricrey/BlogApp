import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

export const connectDb = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('Connected to:' + MONGO_URI)
    } catch(error) {
        console.log('Error connecting to database:' + error)
    }
}