import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import useStyles from "../../Styles";
import RoomContext from "./RoomContext";


function MessageBubble(props) {
  const [room,] = React.useContext(RoomContext);
  let systemMessage = null;

  let classes = useStyles(props);

  let style = {};
  if(room.username === props.message.from) style['justifyContent'] = 'flex-end';
  if(props.message.from === null){
    style['justifyContent'] = 'space-around';
    if(props.message.type === 'join'){
      systemMessage = `${props.message.extra} joined`;
    } else if (props.message.type === 'username'){
      systemMessage = `${props.message.extra[0]} changed username to ${props.message.extra[1]}`;
    } else if (props.message.type === 'url'){
      systemMessage = `${props.message.extra} changed YouTube URL`;
    } else if (props.message.type === 'left'){
      systemMessage = `${props.message.extra} left`;
    }
  }

  let timestamp = new Date(props.message.timestamp);

  return(
    <Box className={classes.MessageBubbleRoot} style={style}>
      <Paper className={classes.MessageBubble}>
        {systemMessage === null ? (
          <>
            <Box className={classes.MessageBubbleContainer}>
              {props.message.from && (
                <Box fontWeight="fontWeightBold">
                  {room.username !== props.message.from ? props.message.from : undefined}
                </Box>
              )}
              {props.message.text && (
                <Box fontWeight="fontWeightLight" style={{"paddingLeft": "5px"}} className={classes.Message}>
                  {props.message.text}
                </Box>
              )}
            </Box>
            <Typography variant="body2" align="right" className={classes.MessageBubbleTimestamp}>
              {timestamp.toLocaleTimeString()}
            </Typography>
          </>
        ) : (
          <Typography variant="body2" align="center" className={classes.MessageBubbleTimestamp}>
            {systemMessage}
          </Typography>
        )}
      </Paper>
    </Box>
  )
}

export default MessageBubble;
