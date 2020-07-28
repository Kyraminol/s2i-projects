import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import RoomContext from './RoomContext';


function LinkDialog(props) {
  const [room,] = React.useContext(RoomContext);
  const [open, setOpen] = props.open;
  const [url, setUrl] = React.useState("");

  function onChange(e){
    setUrl(e.currentTarget.value);
  }

  const getUrlId = (url) => {
    let regex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?‌​[\w?‌​=]*)?/.exec(url);
    if(regex && regex[1] !== '' && regex[1].length > 3) return regex[1];
    return false;
  };

  const handleUrl = (emit) => {
    const id = getUrlId(url);
    if(id){
      room.socket.emit(emit, id);
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
        <Button onClick={() => {handleUrl('url')}} color="primary">
          Play Now
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LinkDialog;
