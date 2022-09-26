import {API_URL} from '@/config/index';
import cookie from 'cookie'

export default async (req, res) => {

  if (req.method === "POST") {

    //validate user using identifier and password
    const strapiRes = await fetch(`${API_URL}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: req.body,
    });

    const data = await strapiRes.json();


    //check if user is verified
    if (data.data !== null) {

      //set cookie in headers which will be used to check by other apis to validate users
      res.setHeader('Set-Cookie', cookie.serialize('token', data.jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'strict',
        path: '/'
      }))


      res.status(200).json({ user: data.user });

      //if the user is not verified
    } else {
      res
      .status(data.error.status)
          .json({ error: data.error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
