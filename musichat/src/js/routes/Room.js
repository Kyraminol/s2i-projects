// Route component for /room/

// Relative imports
import Header from './components/Header';
import Footer from './components/Footer';
import RoomNavbar from './components/RoomNavbar';
import RoomContext from './components/RoomContext';
import Player from './components/Player';
import Chat from './components/Chat';
import useStyles from '../Styles';
// Module imports
import React from 'react';
import { useParams } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import Divider from '@material-ui/core/Divider';


const Room = (props) => {
  // Create classes names
  const classes = useStyles(props);
  // Get react-router URL params
  const params = useParams();

  // Setup room variables to be used in all components
  const [room, setRoom] = React.useState({
    socket: null,
    username: null,
    url: null,
    users: [],
    typing: [],
    messages: [],
    player: false,
    status: null,
  });

  // Function called when room.username, params.name or room are changed
  React.useEffect(() => {
    // When username is set and socket isn't already setup, do setup the socket
    if(room.username !== null && room.socket === null){
      let socket = socketIOClient();

      // Callback for "message" event, adds the message to the room messages
      socket.on('message', (message) => {
        setRoom((room) => {return {...room, 'messages': room.messages.concat(message)}});
      });

      // Callback for "username" event, updates the room username
      socket.on('username', (username) => {
        setRoom((room) => {return {...room, 'username': username}});
      });

      // Callback for "typing" event, adds the typing user to the room list and set a timeout of 2 seconds
      // that clears that user from the list
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

      // Callback for "url" event, sets the YouTube URL variable of the room
      socket.on('url', (url) => {
        setRoom((room) => {return {...room, 'url': url}});
      });

      // Callback for "room" event, checks what params are present and set the corresponding variables on the room
      socket.on('room', (values) => {
        if(values.room){
          setRoom((room) => {return {...room, 'url': values['room']['url']}});
        }
        if(values.users){
          setRoom((room) => {return {...room, 'users': values['users']}});
        }
      });

      // Callback for "sync" event, set sync status of users
      socket.on('sync', (sync) => {
        setRoom((room) => {return {...room, 'status': sync.room.status, 'users': sync.users}});
      });

      // Callback for "users" event, sets room users to received list
      socket.on('users', (users) => {
        setRoom((room) => {return {...room, 'users': users}});
      });

      // Send username and room name to the server
      socket.emit('join', {room: params.name, username: room.username});

      room.socket = socket;
    }
  }, [params.name, room.username, room]);


  return (
    // Setup the room provider, this allows to avoid passing room and setRoom to all props
    <RoomContext.Provider value={[room, setRoom]}>
      {/* Set header with the Room buttons */}
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
