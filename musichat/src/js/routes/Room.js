import Header from './components/Header';
import Footer from './components/Footer';
import RoomNavbar from './components/RoomNavbar';
import RoomContext from './components/RoomContext';
import Chat from './components/Chat';
import useStyles from '../Styles';

import React from 'react';
import { useParams } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import Divider from '@material-ui/core/Divider';
import Player from "./components/Player";


function Room(props) {
  const [room, setRoom] = React.useState({
    socket: null,
    username: null,
    url: null,
    users: [],
    typing: [],
    messages: [],
    player: false,
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

      socket.on('typing', (user) => {
        setRoom((room) => {
          if(!room.typing.includes(user)){
            setTimeout((user, setRoom) => {
              setRoom((room) => {return {...room, 'typing': room.typing.filter(item => item !== user)}});
            }, 2000, user, setRoom);
            return {...room, 'typing': room.typing.concat(user)};
          } else {
            return room;
          }
        });

      });

      socket.on('url', (url) => {
        setRoom((room) => {return {...room, 'url': url}});
      });

      socket.on('room', (values) => {
        if(values.room){
          setRoom((room) => {return {...room, 'url': values['room']['url']}});
        }
        if(values.users){
          setRoom((room) => {return {...room, 'users': values['users']}});
        }
      });

      socket.on('sync', (sync) => {
        setRoom((room) => {return {...room, 'sync': sync}});
      });

      socket.emit('join', {room: params.name, username: room.username});

      room.socket = socket;
    }
  }, [params.name, room.username, room]);


  return(
    <RoomContext.Provider value={[room, setRoom]}>
      <Header menu={ <RoomNavbar/> }/>
      <main className={classes.RoomMain}>
        <Player/>
        <Chat/>
      </main>
      <Divider light/>
      <Footer/>
    </RoomContext.Provider>
  )
}

export default Room;
