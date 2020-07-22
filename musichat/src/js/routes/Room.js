import Header from './components/Header';
import Footer from './components/Footer';
import RoomNavbar from './components/RoomNavbar';
import RoomContext from './components/RoomContext';
import useStyles from '../Styles';

import React from 'react';
import { useParams } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import Divider from '@material-ui/core/Divider';
import Chat from "./components/Chat";


function Room(props) {
  const [room, setRoom] = React.useState({
    socket: null,
    username: null,
    url: null,
    users: [],
    typing: [],
    messages: [],
  });

  const classes = useStyles(props);
  const params = useParams();

  React.useEffect(() => {
    if(room.username !== null && room.socket === null){
      let socket = socketIOClient();

      socket.on('message', (message) => {
        setRoom((room) => {return {...room, 'messages': room.messages.concat(message)}});
      });

      socket.on('username', (username) => {
        setRoom((room) => {return {...room, 'username': username}});
      });

      socket.emit('join', {room: params.name, username: room.username});

      room.socket = socket;
    }
  }, [params.name, room.username, room]);


  return(
    <RoomContext.Provider value={[room, setRoom]}>
      <Header menu={ <RoomNavbar/> }/>
      <main className={classes.RoomMain}>
        <Chat/>
      </main>
      <Divider light/>
      <Footer/>
    </RoomContext.Provider>
  )
}

export default Room;
