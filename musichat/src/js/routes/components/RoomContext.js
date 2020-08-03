// Compoent for the room contexts that holds all variables to be imported in components

// Module imports
import React from 'react';


const RoomContext = React.createContext({room: {}, setRoom: () => {}});

export default RoomContext;
