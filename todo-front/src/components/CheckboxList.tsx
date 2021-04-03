import React, { useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import { Box, Button, CardContent } from '@material-ui/core';
import { deleteTask, patchTask } from './RequestConfig';
import SimpleModal from './SimpleModal';
import CreateModal from './CreateModal';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));
export interface taskIf {
  text: string;
  completed: boolean;
  id:number
}
interface taskListIf {
  tasklist: taskIf[]
}
function initChecks(taskList:taskIf[]) {
  let newChecked: number[] = [];
  taskList.forEach((taskItem, index) =>
  {if (taskItem.completed) {
    newChecked.push(index);
  } 
  });
  return newChecked;
}

export default function CheckboxList({ tasklist }: taskListIf) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([-1]);
  const [copyList, setCopylist]= React.useState<taskIf[]>([]);
  useEffect(()=>{
    if (tasklist) {
      setChecked(initChecks(tasklist))
      setCopylist(tasklist)
    }
  },[tasklist,setCopylist])

  const refresh=useCallback((newList:taskIf[])=>{
    setCopylist(newList.sort((a, b)=> a.id - b.id))
  },[setCopylist])

  const toggleCompleteTask=(taskID:number, taskState:boolean, index:number)=>()=>{
    handleToggle(index);    
    patchTask(taskID,taskState);
  }  
  const handleDelete = (id:number)=>()=>{
    deleteTask(id).then(res=>{
      console.log(res);      
      refresh(res.data._embedded.tasks)
    })
  }
  const handleToggle = (value: number) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }   

    setChecked(newChecked);
  };
  
  
  return (
    <Box>
      <CreateModal refresh={refresh}/>      
      <List className={classes.root}>
        {copyList.map((taskItem, index) => {
          const labelId = `checkbox-list-label-${index}`;

          return (
            <CardContent>
              <ListItem key={taskItem.id} role={undefined} dense button onClick={toggleCompleteTask(taskItem.id, taskItem.completed,index)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(index) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={taskItem.text} />
                <ListItemSecondaryAction>
                  <Button  aria-label="delete" onClick={handleDelete(taskItem.id)}>
                    <DeleteSharpIcon />
                  </Button>
                  <SimpleModal taskID={taskItem.id} taskText={taskItem.text} refresh={refresh}/>
                </ListItemSecondaryAction>
              </ListItem>
            </CardContent>
          );
        })}
      </List>
    </Box>
  );
}
