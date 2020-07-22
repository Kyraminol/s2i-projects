import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Box} from "@material-ui/core";
import RoomContext from "./RoomContext";


function UsernameDialog(props) {
  const [room, setRoom] = React.useContext(RoomContext);
  const [open, setOpen] = props.open;
  const [username, setUsername] = React.useState("");

  function onChange(e){
    setUsername(e.currentTarget.value);
  }

  React.useEffect(() => {
    if(room.username === null && Boolean(localStorage.getItem('username')) === true){
      setRoom({...room, 'username': localStorage.getItem('username')});
    }
  })

  function handleSubmit(e){
    e.preventDefault();
    setRoom({...room, 'username': username});
    setOpen(false);
  }

  React.useEffect(() => {
    if(room.username !== null){
      localStorage.setItem('username', room.username);
    }
  }, [room.username]);

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Username</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Choose an username or leave it blank to get a random one
        </DialogContentText>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            fullWidth
            onChange={onChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UsernameDialog;
