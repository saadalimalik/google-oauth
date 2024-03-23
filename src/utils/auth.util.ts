export const getGoogleAuthURL = () => {
  const options = {
    redirect_uri: `${process.env.SERVER_ROOT_URI}${process.env.GOOGLE_REDIRECT_URI}`,
    client_id: process.env.GOOGLE_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [],
  };
};
