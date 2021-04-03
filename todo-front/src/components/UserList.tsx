import { Box, Container } from '@material-ui/core';

import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import CheckboxList from './CheckboxList';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { fetchTasks } from './RequestConfig';
import App from '../App';


interface taskIF {
  text: string;
  completed: boolean;
  id: number;
}

const UserList = ({ tok }: { tok: string }) => {
  const [tasks, setTasks] = useState<taskIF[]>();
  const { isLoading, error, data } = useQuery('fetchTasks', { queryFn: fetchTasks })
  useEffect(() => {    
    if (data && data.data)    
    
      setTasks(Array.from<taskIF>(data.data._embedded.tasks
        .map((item: { text: any; completed: any; id: any }) => { 
          return { 'text': item.text, 'completed': item.completed, 'id': item.id } })
          )
        .sort((a, b) => a.id - b.id )
      )

  }, [data, setTasks])

  const logout= ()=>()=>{
    sessionStorage.clear();
    window.location.href = '/';    
  }

  return (
    <Container>
      <IconButton onClick={logout()}>
        <ExitToAppIcon /> exit
      </IconButton>      
      {error && <div>Something went wrong ...</div>}

      {isLoading || !data ? (
        <div>Retrieving your tasks Information ...</div>
      ) : (
        <Box>
          {tasks && <CheckboxList tasklist={tasks} />}
        </Box>

      )}
    </Container>

  )
}
export default UserList;