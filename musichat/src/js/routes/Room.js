import Header from './components/Header';
import Footer from './components/Footer';

import React from 'react';
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SendIcon from '@material-ui/icons/Send';
import { useParams } from 'react-router-dom';
import socketIOClient from "socket.io-client";
import useStyles from "../Styles";
import UsernameDialog from "./components/UsernameDialog";
import MessageBubble from "./components/MessageBubble";


const socket = socketIOClient();



function Room(props) {
  const classes = useStyles(props);
  const params = useParams();
  const [socketReady, setSocketReady] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const [username, setUsername] = React.useState(null);
  const [usernameDialogOpen, setUsernameDialogOpen] = React.useState(true);
  const [roomInfo, setRoomInfo] = React.useState(null);


  React.useEffect(() => {
    if(username !== null && socket.connected && socketReady === false){
      setSocketReady(true);
      socket.on('message', (message) => {
        setMessages((messages) => messages.concat(message));
      });
      socket.on('room', (room) => {
        setRoomInfo(room);
      })
      socket.emit('room', {room: params.name, username: username});
    }
  }, [username, params, messages, socketReady]);


  function handleSubmit(e){
    e.preventDefault();
    let input =  document.getElementById('message-input');
    socket.emit('message', input.value);
    input.value = '';
  }

  return(
    <>
      <Header/>
      <main className={classes.RoomMain}>
        <UsernameDialog setUsername={setUsername} open={[usernameDialogOpen, setUsernameDialogOpen]}/>
        <Container>
          {messages.map((message) => <MessageBubble message={message}/>)}
        </Container>
        <Paper component="form" className={classes.RoomInputRoot} square elevation={2} onSubmit={handleSubmit}>
          <InputBase
            autoFocus={true}
            autoComplete="off"
            id="message-input"
            fullWidth
            className={classes.RoomInputInput}
            placeholder="Write a message..."
          />
          <IconButton type="submit" className={classes.RoomInputIcon}>
            <SendIcon/>
          </IconButton>
        </Paper>
      </main>
      <Divider light/>
      <Footer/>
    </>
  )
}

export default Room;
