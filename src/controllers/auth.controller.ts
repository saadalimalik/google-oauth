import { Request, Response } from 'express-serve-static-core';

import jwt from 'jsonwebtoken';
import {
  getGoogleAuthURL,
  getGoogleUser,
  getGoogleUserTokens,
} from '../utils/auth.util';
import GoogleUser from '../models/googleUser.model';

export const googleAuth = (req: Request, res: Response) => {
  // Get google consent/login screen url
  const googleAuthURL = getGoogleAuthURL();
  // Redirect to the login page
  res.redirect(googleAuthURL);
};

export const googleLogin = async (req: Request, res: Response) => {
  // Get the authorization code as a query set by google by sending request to the redirect url
  const code = req.query.code as string;

  try {
    // Get the necessary tokens by sending the request to appropriate url
    const { id_token, access_token } = await getGoogleUserTokens({ code });
    // Using the received tokens, get the associated google user
    const googleUser = await getGoogleUser({ id_token, access_token });
    // If the user's email is not verified, send them back
    if (!googleUser.verified_email)
      return res.status(400).send({ msg: 'User email is not verified' });

    // Upsert the user (Update if it exists, create one if it does not)
    const user = await GoogleUser.findOneAndUpdate(
      { email: googleUser.email },
      {
        id: googleUser.id,
        name: googleUser.name,
        email: googleUser.email,
        picture: googleUser.picture,
      },
      { upsert: true, new: true }
    );

    // Create access and refresh tokens
    const accessToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET || '', {
      expiresIn: 60000 * 15,
    }); // 15 Minutes
    const refreshToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET || '', {
      expiresIn: 60000 * 60 * 24,
    }); // 1 day

    return res
      .status(200)
      .send({ msg: 'User logged in successfully', accessToken, refreshToken });
  } catch (error: any) {
    console.log(error);
  }
};
