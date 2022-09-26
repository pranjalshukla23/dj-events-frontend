import {createContext, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {NEXT_URL} from '@/config/index';

//create a context
const AuthContext = createContext();

//create a context provider and export it
export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  //register user
  const register = async (user) => {

    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'json/application',
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push('/account/dashboard');
    } else {
      console.log(data.error)
      setError(data.error);
    }
  };

  // Login user
  const login = async ({email: identifier, password}) => {

    // Strapi uses 'identifier' as an user/email
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'json/application',
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push('/account/dashboard');
    } else {
      setError(data.error);
    }
  };

  //logout user
  const logout = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: 'POST',
    });
    if (res.ok) {
      setUser(null);
      router.push('/');
    }
  };

  //check if user is logged in
  const checkUserLoggedIn = async () => {

    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();
   // console.log(data);
    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

  return (
      <AuthContext.Provider value={{user, error, register, login, logout}}>
        {children}
      </AuthContext.Provider>
  );
};

//export the context
export default AuthContext;
