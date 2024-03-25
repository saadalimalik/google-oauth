import { Request, Response } from 'express-serve-static-core';

import {
  getGoogleAuthURL,
  getGoogleUser,
  getGoogleUserTokens,
} from '../utils/auth.util';
import User from '../models/user.model';
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
    // Check if user is already registered in the database
    const userAlreadyExist = await GoogleUser.findOne({
      email: googleUser.email,
    });
    // Send the same user back if it already exists
    if (userAlreadyExist)
      return res.status(200).send({
        msg: `User is already registered on email: ${userAlreadyExist.email}`,
        user: userAlreadyExist,
      });
    // Upsert the user (Update if it exists, create one if it does not)
    // const user = GoogleUser.findOneAndUpdate(
    //   { email: googleUser.email },
    //   {
    //     id: googleUser.id,
    //     name: googleUser.name,
    //     email: googleUser.email,
    //     picture: googleUser.picture,
    //   },
    //   { upsert: true, new: true }
    // );

    if (!googleUser.verified_email)
      return res.status(400).send({ msg: 'User email is not verified' });

    const user = new GoogleUser({
      id: googleUser.id,
      name: googleUser.name,
      email: googleUser.email,
      picture: googleUser.picture,
    });

    await user.save();

    return res.status(201).send({ msg: 'User logged in successfully', user });
  } catch (error: any) {
    console.log(error);
  }
};
