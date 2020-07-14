import Header from './components/Header';
import Footer from './components/Footer';

import React from 'react';
import { useParams } from 'react-router-dom';
import socketIOClient from "socket.io-client";
import UsernameDialog from "./components/UsernameDialog";


const socket = socketIOClient();

function Room() {
  const params = useParams();
  const [messages, setMessages] = React.useState([]);
  const [username, setUsername] = React.useState(null);
  const [usernameDialogOpen, setUsernameDialogOpen] = React.useState(true);

  React.useEffect(() => {
    if(username !== null && socket.connected){
      socket.on('message', (message) => {
        setMessages(messages.concat(message));
      });
      socket.on('room', (room) => {
        console.log(room);
      })
      socket.emit('room', {room: params.name, username: username});
    }
  }, [username, params, messages]);



  return(
    <>
      <Header/>
      <main>
        <UsernameDialog setUsername={setUsername} open={[usernameDialogOpen, setUsernameDialogOpen]}/>
      </main>
      <Footer/>
    </>
  )
}

export default Room;
