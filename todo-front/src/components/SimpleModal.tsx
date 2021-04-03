import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import { Done, Edit } from '@material-ui/icons';
import { editTask, fetchTasks } from './RequestConfig';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { taskIf } from './CheckboxList';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

const SimpleModal = ({taskID,taskText,refresh}:{taskID:number, taskText:string, refresh:(newList: taskIf[]) => void}) =>{
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState<string>(taskText);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const sendRequest = (taskID:number) => () =>{
    editTask(taskID,text).then(res=>{ refresh(res.data._embedded.tasks) } )    
  };

  const handleTextChange : React.ChangeEventHandler<HTMLInputElement> =
  (event) => {
    setText(event.target.value)
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">edite su tarea</h2>
      <form noValidate autoComplete="off" >      
      <TextField id="outlined-basic" label="Outlined" variant="outlined" defaultValue={taskText} onChange={handleTextChange}/>
    </form>
      <Button aria-label="edit" onClick={sendRequest(taskID)}><Done /></Button>      
    </div>
  );

  return (
    <div>
      <IconButton edge="end" aria-label="edits" onClick={handleOpen}><Edit /></IconButton>      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
export default SimpleModal;