import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


function UsernameDialog(props) {
  const [open, setOpen] = props.open;
  const [username, setUsername] = React.useState("");

  const handleClose = () => {
    props.setUsername(username);
    setOpen(false);
  }

  function onChange(e){
    setUsername(e.currentTarget.value);
  }


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
        <TextField
          autoFocus
          margin="dense"
          id="username"
          label="Username"
          fullWidth
          onChange={onChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UsernameDialog;
