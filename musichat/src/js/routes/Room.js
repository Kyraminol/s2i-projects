import Header from './components/Header';
import Footer from './components/Footer';

import React from 'react';
import { useParams } from 'react-router-dom';
import socketIOClient from "socket.io-client";

const socket = socketIOClient();

function Room() {
  const params = useParams();
  console.log(params);
  const [response, setResponse] = React.useState(null);

  React.useEffect(() => {
    socket.on('connect', () => {
      socket.emit('room', params.name);
      setInterval(()=> {
        socket.emit('msg', 'ok');
      }, 1000)

    });
    socket.on('msg', (msg) => {
      console.log(msg);
    });
  }, [params]);



  return(
    <>
      <Header/>
      <main/>
      <Footer/>
    </>
  )
}

export default Room;
