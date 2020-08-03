// Component that holds navbar buttons and menus for the room

// Relative imports
import PlayerMenu from './PlayerMenu';
import UsersDrawer from './UsersDrawer';
import SelfMenu from './SelfMenu';
// Module imports
import React from 'react';


const RoomNavbar = () => {
  return (
    <>
      <PlayerMenu/>
      <UsersDrawer/>
      <SelfMenu/>
    </>
  )
}

export default RoomNavbar;
