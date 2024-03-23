import { Request, Response } from 'express-serve-static-core';
import { getGoogleAuthURL } from '../utils/auth.util';

export const googleAuth = (req: Request, res: Response) => {
  const googleAuthURL = getGoogleAuthURL();

  res.send(googleAuthURL);
};
