import express from 'express';
import dotenv from 'dotenv';

import userRouter from './routes/users';
import authRouter from './routes/auth';

// Initialize env variables on the process object
dotenv.config();

const app = express();

const PORT = 3000;

app.use('/api/users', userRouter);
app.use('/api/auth/google', authRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
