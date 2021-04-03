import React, { useCallback } from 'react';
import './App.css';
import Login from './components/Login';
import UserList from './components/UserList';
import useToken from './hooks/useToken';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function App() {

  const { token, setToken } = useToken(); 
   
  const getToken = useCallback((hash:string) => {
    setToken({'token':hash});
}, [setToken])

  if(!token) {
    return <Login setToken={getToken} />
  }   

  return (
    <QueryClientProvider client={queryClient}>
    <UserList tok={token}/>    
    </QueryClientProvider>    
  );
}
