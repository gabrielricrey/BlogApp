import express from 'express';
import { connectDb } from './db/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import blogPostRouter from './routes/blogpost.route.js';
import userRouter from './routes/user.route.js'
import loginRouter from './routes/login.route.js'
import authRouter from './routes/auth.route.js'
import friendsRouter from './routes/friends.route.js';

dotenv.config();

const PORT = process.env.PORT

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/blogpost', blogPostRouter)
app.use('/api/users', userRouter)
app.use('/login', loginRouter)
app.use('/auth/verify', authRouter)
app.use('/friends',friendsRouter);

app.get('/', (req,res) => {
    console.log('Hello world!')
})

app.listen(3000, () => {
    connectDb();
    console.log('Listening on port:' + PORT)
})