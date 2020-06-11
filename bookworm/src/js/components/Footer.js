import useStyles from '../styles';

import Typography from '@material-ui/core/Typography';
import React from 'react';


function Footer(props){
  let classes = useStyles(props);
  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        Credits
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">

      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © Gianmarco Randazzo '}
        {new Date().getFullYear()}
      </Typography>
    </footer>
  )
}

export default Footer;
