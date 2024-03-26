import { Request, Response } from 'express-serve-static-core';
import express from 'express';
import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';
dotenv.config();

import routes from './routes/index';
import { connectToMongoDB } from './services/db';

const app = express();

connectToMongoDB();

app.get('/', (req: Request, res: Response) => {
  res.send({ msg: 'Welcome to the backend;' });
});

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(routes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening on port ${process.env.PORT || 3000}`);
});
