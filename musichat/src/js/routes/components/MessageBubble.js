import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import useStyles from "../../Styles";


function MessageBubble(props) {
  let classes = useStyles(props);

  return(
    <Paper className={classes.MessageBubble}>
      <Typography>
        {props.message.from}
      </Typography>
      <Typography>
        {props.message.text}
      </Typography>
      <Typography>
        {props.message.timestamp}
      </Typography>
    </Paper>
  )
}

export default MessageBubble;
