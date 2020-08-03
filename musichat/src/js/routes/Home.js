// Route component for /

// Relative imports
import Header from './components/Header';
import RoomSelect from './components/RoomSelect';
import Footer from './components/Footer';
// Module imports
import React from 'react';


const Home = () => {
  return (
    <>
      <Header/>
      <RoomSelect/>
      <Footer/>
    </>
  )
}

export default Home;
