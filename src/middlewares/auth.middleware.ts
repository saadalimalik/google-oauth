import { Request, Response, NextFunction } from 'express-serve-static-core';
import jwt from 'jsonwebtoken';

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { access_token } = req.body;

  const tokenVerified = jwt.verify(
    access_token,
    process.env.JWT_SECRET as string
  );
  console.log('Token is:', tokenVerified);
};
