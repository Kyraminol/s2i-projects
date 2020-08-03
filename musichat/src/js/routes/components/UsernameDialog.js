// Component for the dialog to set username

// Relative imports
import RoomContext from './RoomContext';
// Module imports
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';


const UsernameDialog = (props) => {
  // Import room variables from context
  const [room, setRoom] = React.useContext(RoomContext);
  // Unpack open dialog state from props
  const [open, setOpen] = props.open;
  // State for storing username while typing
  const [username, setUsername] = React.useState("");

  // Function called every time dialog input is changed
  const onChange = (event) => {
    setUsername(event.currentTarget.value);
  }

  // If room username is not set and there is an username saved in local storage, load that
  React.useEffect(() => {
    if(room.username === null && Boolean(localStorage.getItem('username')) === true){
      setRoom({...room, 'username': localStorage.getItem('username')});
    }
  })

  // Function called when username form is submitted
  // If room socket is already set, send new username to the server
  // If room socket is not set, set room username
  const handleSubmit = (event) => {
    event.preventDefault();
    if(room.socket === null){
      setRoom({...room, 'username': username});
    } else {
      room.socket.emit('username', username);
    }
    setOpen(false);
  }

  // Save username to local storage every time room username is changed
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
        {/* Username form */}
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
        {/* Confirm button */}
        <Button onClick={handleSubmit} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UsernameDialog;
