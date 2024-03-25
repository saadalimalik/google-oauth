import { Request, Response } from 'express-serve-static-core';

import {
  getGoogleAuthURL,
  getGoogleUser,
  getGoogleUserTokens,
} from '../utils/auth.util';

export const googleAuth = (req: Request, res: Response) => {
  const googleAuthURL = getGoogleAuthURL();

  res.redirect(googleAuthURL);
};

export const googleLogin = async (req: Request, res: Response) => {
  const code = req.query.code as string;

  try {
    const { id_token, access_token } = await getGoogleUserTokens({ code });

    const googleUser = await getGoogleUser({ id_token, access_token });

    res.send(googleUser);
  } catch (error: any) {
    console.log(error);
  }
};
