import MessageBubble from './MessageBubble';
import RoomContext from './RoomContext';
import useStyles from '../../Styles';

import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';


const Chat = (props) => {
  const [room,] = React.useContext(RoomContext);
  const classes = useStyles(props);
  const messagesEndRef = React.useRef(null)

  function handleChange(){
    if(document.getElementById('message-input').value !== '') room.socket.emit('typing');
  }

  function handleSubmit(e){
    e.preventDefault();
    let input = document.getElementById('message-input');
    if(input.value === '') return;
    room.socket.emit('message', input.value);
    input.value = '';
  }

  function scrollToBottom(){
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(scrollToBottom, [room.messages]);


  return(
    <>
      <Box className={classes.MessagesContainer}>
        {room.messages.concat().sort((a, b) => a.timestamp - b.timestamp).map((message, index) => <MessageBubble message={message} key={index}/>)}
        <div ref={messagesEndRef} />
      </Box>
      { room.typing.join(', ') } { room.typing.length > 0 ? (room.typing.length === 1 ? ' is typing...' : ' are typing...') : undefined }
      <Paper component="form" className={classes.ChatInputRoot} square elevation={1} onSubmit={handleSubmit}>
        <InputBase
          autoFocus={true}
          autoComplete="off"
          id="message-input"
          fullWidth
          className={classes.ChatInputInput}
          placeholder="Write a message..."
          onChange={handleChange}
        />
        <IconButton type="submit" className={classes.ChatInputIcon}>
          <SendIcon/>
        </IconButton>
      </Paper>
    </>
  )
};

export default Chat;
