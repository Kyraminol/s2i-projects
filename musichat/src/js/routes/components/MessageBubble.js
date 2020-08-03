// Component for a single message bubble

// Relative imports
import RoomContext from './RoomContext';
import useStyles from '../../Styles';
// Module imports
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


const MessageBubble = (props) => {
  // Create classes names
  let classes = useStyles(props);
  // Import room variables from context
  const [room,] = React.useContext(RoomContext);

  let systemMessage = null;

  // If message is from another user bubble is left aligned
  // If message is from self bubble is right aligned right
  // If message is a system message bubble is center aligned
  let style = {};
  if(room.username === props.message.from) style['justifyContent'] = 'flex-end';
  if(props.message.from === null){
    style['justifyContent'] = 'space-around';
    // Set system message based on message type
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

  // Parse message timestamp to Date object
  let timestamp = new Date(props.message.timestamp);

  return (
    <Box className={classes.MessageBubbleRoot} style={style}>
      <Paper className={classes.MessageBubble}>
        {/* If message is not a system message print message text along with sender name and timestamp */}
        {/* If message is a system message print only system message text */}
        {systemMessage === null ? (
          <>
            <Box className={classes.MessageBubbleContainer}>
              {props.message.from && (
                <Box fontWeight="fontWeightBold">
                  {/* Print sender username only when is from other users */}
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
              {/* Format timestamp with local timezone */}
              {timestamp.toLocaleTimeString()}
            </Typography>
          </>
        ) : (
          <Typography variant="body2" align="center" className={classes.MessageBubbleTimestamp}>
            {/* If message is from system then print system message */}
            {systemMessage}
          </Typography>
        )}
      </Paper>
    </Box>
  )
}

export default MessageBubble;
