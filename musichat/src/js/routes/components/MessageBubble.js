import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import useStyles from "../../Styles";


function MessageBubble(props) {
  let classes = useStyles(props);

  let style = {};
  if(props.self.name === props.message.from) style['justifyContent'] = 'end';

  let timestamp = new Date(props.message.timestamp);

  return(
    <Box className={classes.MessageBubbleRoot} style={style}>
      <Paper className={classes.MessageBubble}>
        <Box className={classes.MessageBubbleContainer}>
          <Box fontWeight="fontWeightBold">
            {props.self.name !== props.message.from ? props.message.from : undefined}
          </Box>
          <Box fontWeight="fontWeightLight" style={{"paddingLeft": "5px"}} className={classes.Message}>
            {props.message.text}
          </Box>
        </Box>

        <Typography variant="body2" align="right" className={classes.MessageBubbleTimestamp}>
          {timestamp.toLocaleTimeString()}
        </Typography>

      </Paper>
    </Box>
  )
}

export default MessageBubble;
