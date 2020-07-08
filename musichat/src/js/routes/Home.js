import Header from './components/Header';
import RoomSelect from './components/RoomSelect';
import Footer from './components/Footer';

import React from 'react';
import { CssBaseline } from '@material-ui/core';


function Home() {
  return(
    <>
      <CssBaseline/>
      <Header/>
      <RoomSelect/>
      <Footer/>
    </>
  )
}

export default Home;
