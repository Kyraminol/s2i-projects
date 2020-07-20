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
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";


const socket = socketIOClient();



function Room(props) {
  const classes = useStyles(props);
  const params = useParams();

  const [socketReady, setSocketReady] = React.useState(null);
  const [messages, setMessages] = React.useState([]);
  const [username, setUsername] = React.useState(localStorage.getItem('username') || null);
  const [usernameDialogOpen, setUsernameDialogOpen] = React.useState(username === null);
  const [roomInfo, setRoomInfo] = React.useState(null);
  const [users, setUsers] = React.useState([]);
  const [selfInfo, setSelfInfo] = React.useState(null);
  const [typing, setTyping] = React.useState([]);

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
        if(room.users){
          setUsers(room.users);
        }
      });

      socket.on('typing', (user) => {
        setTyping((typing) => {
          if(!typing.includes(user)){
            setTimeout((user, setTyping) => {
              setTyping((typing) => typing.filter(item => item !== user));
            }, 2000, user, setTyping);
            return typing.concat(user);
          } else {
            return typing;
          }
        });
      });

      socket.on('users', (users) => {
        setUsers(users);
      });

      socket.on('self', (self) => {
        setSelfInfo(self);
      });

      socket.emit('room', {room: params.name, username: username});

      setSocketReady(true);
    }
  }, [username, params, messages, socketReady, typing]);

  function handleChange(){
    if(document.getElementById('message-input').value !== '') socket.emit('typing');
  }

  function handleSubmit(e){
    e.preventDefault();
    let input = document.getElementById('message-input');
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
      <Header
        menu={
          <NavbarMenu
            setUsernameDialogOpen={setUsernameDialogOpen}
            users={users}
            self={selfInfo}
          />
        }/>
      <main className={classes.RoomMain}>
        <UsernameDialog setUsername={setUsername} open={[usernameDialogOpen, setUsernameDialogOpen]}/>
        <Box className={classes.MessagesContainer}>
          {messages.concat().sort((a, b) => a.timestamp - b.timestamp).map((message) => <MessageBubble message={message} self={selfInfo}/>)}
          <div ref={messagesEndRef} />
        </Box>
        { typing.join(', ') } { typing.length > 0 ? (typing.length === 1 ? ' is typing...' : ' are typing...') : undefined }
        <Paper component="form" className={classes.RoomInputRoot} square elevation={1} onSubmit={handleSubmit}>
          <InputBase
            autoFocus={true}
            autoComplete="off"
            id="message-input"
            fullWidth
            className={classes.RoomInputInput}
            placeholder="Write a message..."
            onChange={handleChange}
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
  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleUsername(){
    props.setUsernameDialogOpen(true);
    setAnchorEl(null);
  }

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  console.log(props.users);

  return(
    <>
      <IconButton
        color="inherit"
        onClick={toggleDrawer}
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
        <MenuItem onClick={handleUsername}>Edit Username</MenuItem>
      </Menu>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <div
          role="presentation"
        >
          <List>
            {props.self !== null ? (
              <List>
                <ListItem disabled button className={classes.UsersListTitle}>
                  <ListItemText primary="You"/>
                </ListItem>
                <ListItem divider button className={classes.UsersListUser}>
                  <ListItemText primary={props.self.name}/>
                </ListItem>
              </List>
              ) : undefined}
          </List>
          <List>
            { props.users.length > 0 ? (
              <>
                <ListItem disabled button className={classes.UsersListTitle}>
                  <ListItemText primary="Users online"/>
                </ListItem>
                { props.users.map((user, index) => {
                  if(props.self !== null && props.self.name === user) return undefined;
                  return (
                    <ListItem button key={index} className={classes.UsersListUser}>
                      <ListItemText primary={user}/>
                    </ListItem>
                  )
                }) }
              </>
            ) : undefined }
          </List>
        </div>
      </Drawer>
    </>
  )
}

export default Room;
