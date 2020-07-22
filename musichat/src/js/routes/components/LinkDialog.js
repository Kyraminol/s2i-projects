import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Box} from "@material-ui/core";


function LinkDialog(props) {
  const [open, setOpen] = props.open;
  const [link, setLink] = React.useState("");

  function onChange(e){
    setLink(e.currentTarget.value);
  }

  const linkQueue = () => {};
  const linkPlay = () => {};

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Add URL</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="youtube-url"
          label="Youtube URL"
          fullWidth
          onChange={onChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={linkQueue} color="primary">
          Add to Queue
        </Button>
        <Button onClick={linkPlay} color="primary">
          Play Now
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LinkDialog;
