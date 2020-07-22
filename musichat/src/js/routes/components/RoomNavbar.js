import PlayerMenu from "./PlayerMenu";
import UsersDrawer from "./UsersDrawer";
import SelfMenu from "./SelfMenu";
import React from "react";


function RoomNavbar(){
  return(
    <>
      <PlayerMenu/>
      <UsersDrawer/>
      <SelfMenu/>
    </>
  )
}

export default RoomNavbar;
