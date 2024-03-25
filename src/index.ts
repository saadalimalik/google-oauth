import express from 'express';
import { Request, Response } from 'express-serve-static-core';

import dotenv from 'dotenv';
dotenv.config();

import routes from './routes/index';

const app = express();

const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send({ msg: 'Welcome to the backend;' });
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
