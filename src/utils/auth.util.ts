import axios from 'axios';
import qs from 'qs';
import { GoogleUser } from '../interfaces/google';

export const getGoogleAuthURL = () => {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

  const options = {
    redirect_uri:
      `${process.env.SERVER_ROOT_URI}${process.env.GOOGLE_REDIRECT_URI}` as string,
    client_id: process.env.GOOGLE_CLIENT_ID as string,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  };

  return `${rootUrl}?${qs.stringify(options)}`;
};

export const getGoogleUserTokens = async ({ code }: { code: string }) => {
  const url = 'https://oauth2.googleapis.com/token';

  const options = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: `${process.env.SERVER_ROOT_URI}${process.env.GOOGLE_REDIRECT_URI}`,
    grant_type: 'authorization_code',
  };

  try {
    const result = await axios.post(url, qs.stringify(options), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getGoogleUser = async ({
  id_token,
  access_token,
}: {
  id_token: string;
  access_token: string;
}): Promise<GoogleUser> => {
  try {
    const result = await axios.get<GoogleUser>(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );

    return result.data;
  } catch (error) {
    console.log(error);
  }

  return {} as GoogleUser;
};
