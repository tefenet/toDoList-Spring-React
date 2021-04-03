import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');    
    return tokenString;    
  };

  const [token, setToken] = useState<string| null >(getToken());

  const saveToken = (userToken: { token: string; }) => {    
    sessionStorage.setItem('token', "Bearer "+ JSON.parse(JSON.stringify(userToken.token)));
    setToken("Bearer "+ JSON.parse(JSON.stringify(userToken.token)));
  };

  return {
    setToken: saveToken,
    token
  }
}