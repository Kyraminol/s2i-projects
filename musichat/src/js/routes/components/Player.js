import React from "react";
import RoomContext from "./RoomContext";


const Player = (props) => {
  const [room,] = React.useContext(RoomContext);

  return(
    <>
      <iframe
        title="player"
        id="ytplayer"
        height={room.player ? 200 : 0}
        src={room.url || ""}
        frameBorder="0"
        allowFullScreen/>
    </>
  )
};

export default Player;
