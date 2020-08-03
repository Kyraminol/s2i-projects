// Component for the dialog to send a new link to the server

// Relative imports
import RoomContext from './RoomContext';
// Module imports
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from "@material-ui/core/Box";


const LinkDialog = (props) => {
  // Import room variables from context
  const [room,] = React.useContext(RoomContext);
  // Unpack open dialog state from props
  const [open, setOpen] = props.open;
  // State for storing url while typing
  const [url, setUrl] = React.useState("");
  // State for the error message
  const [error, setError] = React.useState("");

  // Function called when url input is changed that updates url state
  const onChange = (event) => {
    setUrl(event.currentTarget.value);
  }

  // Function to check if url is from YouTube.
  // Returns video id if valid, returns false if not valid
  const getUrlId = (url) => {
    let regex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?‌​[\w?‌​=]*)?/.exec(url);
    if(regex && regex[1] !== '' && regex[1].length > 3) return regex[1];
    return false;
  };

  // Function called on form submit, sets error if url is invalid or emits id to socket if valid
  const handleUrl = (emit) => {
    const id = getUrlId(url);
    if(id){
      setError('');
      room.socket.emit(emit, id);
      setOpen(false);
    } else {
      setError('Invalid YouTube URL');
    }
  };

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="md"
      onClose={() => {setOpen(false)}}
    >
      <DialogTitle>Add URL</DialogTitle>
      <DialogContent>
        {/* Url form */}
        <Box component="form" onSubmit={() => {handleUrl('url')}}>
          <TextField
            autoFocus
            margin="dense"
            id="youtube-url"
            label="Youtube URL"
            fullWidth
            onChange={onChange}
            error={Boolean(error)}
            helperText={error}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        {/* Confirm button */}
        <Button onClick={() => {handleUrl('url')}} color="primary">
          Play Now
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LinkDialog;
