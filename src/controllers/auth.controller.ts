import { Request, Response } from 'express-serve-static-core';
import qs from 'qs';
import axios from 'axios';

import { getGoogleAuthURL } from '../utils/auth.util';

export const googleAuth = (req: Request, res: Response) => {
  const googleAuthURL = getGoogleAuthURL();

  res.redirect(googleAuthURL);
};

export const getGoogleUser = async (req: Request, res: Response) => {
  const { code } = req.query;

  console.log(code);

  const url = 'https://oauth2.googleapis.com/token';

  const options = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    grant_type: 'authorization_code',
  };

  try {
    const result = await axios.post(url, qs.stringify(options), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    res.send(result.data);
  } catch (error) {
    console.log(error);
    throw error;
  }

  res.redirect('/');
};
