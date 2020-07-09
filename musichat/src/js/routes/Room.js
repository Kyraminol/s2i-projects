import Header from './components/Header';
import Footer from './components/Footer';

import React from 'react';
import { useParams } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';


function Room() {
  const params = useParams();
  console.log(params);

  return(
    <>
      <CssBaseline/>
      <Header/>
      <main/>
      <Footer/>
    </>
  )
}

export default Room;
