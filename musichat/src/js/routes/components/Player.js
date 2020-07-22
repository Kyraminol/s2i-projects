import React from "react";


const Player = (props) => {
  props.show = true;

  return(
    <>
      <iframe
        title="player"
        id="ytplayer"
        height={props.show ? 200 : 0}
        src={props.url || ""}
        frameBorder="0"
        allowFullScreen/>
    </>
  )
};

export default Player;
