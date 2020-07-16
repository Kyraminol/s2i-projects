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
import GroupIcon from "@material-ui/icons/Group";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";


const socket = socketIOClient();



function Room(props) {
  const classes = useStyles(props);
  const params = useParams();

  const [socketReady, setSocketReady] = React.useState(null);
  const [messages, setMessages] = React.useState([]);
  const [username, setUsername] = React.useState(localStorage.getItem('username') || null);
  const [usernameDialogOpen, setUsernameDialogOpen] = React.useState(username === null);
  const [roomInfo, setRoomInfo] = React.useState(null);
  const [selfInfo, setSelfInfo] = React.useState(null);

  const messagesEndRef = React.useRef(null)

  React.useEffect(() => {
    localStorage.setItem('username', username);
  }, [username]);

  React.useEffect(() => {
    if(username !== null && socketReady === null){
      setSocketReady(false);
      socket.on('message', (message) => {
        setMessages((messages) => messages.concat(message));
      });
      socket.on('room', (room) => {
        setRoomInfo(room);
        if(room.self){
          setSelfInfo(room.self);
        }
      })
      socket.emit('room', {room: params.name, username: username});
      setSocketReady(true);
    }
  }, [username, params, messages, socketReady]);


  function handleSubmit(e){
    e.preventDefault();
    let input =  document.getElementById('message-input');
    if(input.value === '') return;
    socket.emit('message', input.value);
    input.value = '';
  }


  function scrollToBottom(){
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(scrollToBottom, [messages]);

  return(
    <>
      <Header menu={<NavbarMenu/>}/>
      <main className={classes.RoomMain}>
        <UsernameDialog setUsername={setUsername} open={[usernameDialogOpen, setUsernameDialogOpen]}/>
        <Box className={classes.MessagesContainer}>
          {messages.concat().sort((a, b) => a.timestamp - b.timestamp).map((message) => <MessageBubble message={message} self={selfInfo}/>)}
          <div ref={messagesEndRef} />
        </Box>
        <Paper component="form" className={classes.RoomInputRoot} square elevation={1} onSubmit={handleSubmit}>
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

function NavbarMenu(props){
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return(
    <>
      <IconButton
        color="inherit"
      >
        <GroupIcon />
      </IconButton>
      <IconButton
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Edit Username</MenuItem>
      </Menu>
    </>
  )
}

export default Room;
