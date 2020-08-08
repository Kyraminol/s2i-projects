// Component for the chat

// Relative imports
import MessageBubble from './MessageBubble';
import RoomContext from './RoomContext';
import useStyles from '../../Styles';
// Module imports
import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';


const Chat = (props) => {
  // Create classes names
  const classes = useStyles(props);
  // Import room variables from context
  const [room,] = React.useContext(RoomContext);
  // Ref for end of message list placeholder, needed for scrolling to bottom every time a new message is received
  const messagesEndRef = React.useRef(null)

  // Function called when user is typing on input
  // If input is not empty then emits typing event to server socket
  const handleChange = (event) => {
    if(event.currentTarget.value !== '') room.socket.emit('typing');
  }

  // Function called when message input form is submitted
  // Sends message to server socket if message is not empty, then clears the input
  const handleSubmit = (event) => {
    event.preventDefault();
    let input = event.currentTarget.querySelector('#message-input');
    if(input.value === '') return;
    room.socket.emit('message', input.value);
    input.value = '';
  }

  // Function called to scroll at the bottom of the message list
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  // Effect triggered every time room messages is updated
  React.useEffect(scrollToBottom, [room.messages]);

  return (
    <>
      <Box className={classes.MessagesContainer}>
        {/* Sort messages list by timestamp, older messages go first */}
        {room.messages.concat().sort((a, b) => a.timestamp - b.timestamp).map((message, index) => <MessageBubble message={message} key={index}/>)}
        {/* Placeholder for scrolling to bottom every time a message is received */}
        <div ref={messagesEndRef}/>
      </Box>
      {/* Print list of typing users */}
      { room.typing.join(', ') } { room.typing.length > 0 ? (room.typing.length === 1 ? ' is typing...' : ' are typing...') : undefined }
      {/* Form for sending messages, allows to send by pressing Enter key */}
      <Paper component="form" className={classes.ChatInputRoot} square elevation={1} onSubmit={handleSubmit}>
        {/* Input for sending messages */}
        <InputBase
          autoFocus={true}
          autoComplete="off"
          id="message-input"
          fullWidth
          className={classes.ChatInputInput}
          placeholder="Write a message..."
          onChange={handleChange}
        />
        {/* Button to send messages */}
        <IconButton type="submit" className={classes.ChatInputIcon}>
          <SendIcon/>
        </IconButton>
      </Paper>
    </>
  )
};

export default Chat;
