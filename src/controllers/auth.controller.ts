import { Request, Response } from 'express-serve-static-core';

export const googleAuth = (req: Request, res: Response) => {
  res.send('google');
};
