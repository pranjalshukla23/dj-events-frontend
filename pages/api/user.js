import cookie from 'cookie';
import {API_URL} from '@/config/index';

export default async (req, res) => {

  if (req.method === 'GET') {

    //if cookie does not exist in header
    if (!req.headers.cookie) {
      res.status(403).json({
        message: 'Not Authorized',
      });
      return;
    }

    //if cookie exist in header


    //fetch the token from cookie header
    const {token} = cookie.parse(req.headers.cookie);

    //validate user using token
    const strapiRes = await fetch(`${API_URL}/api/users/me`,{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const user = await strapiRes.json()

    //console.log(user)

    if(strapiRes.ok){
      res.status(200).json({user})
    }else{
      res.status(403).json({
        message: 'User forbidden'
      })
    }

  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({message: `Method ${req.method} is not allowed`});
  }
};
