import useStyles from '../../Styles';

import React from 'react';
import Typography from '@material-ui/core/Typography';


function Footer(props){
  let classes = useStyles(props);
  return (
    <footer className={classes.Footer}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © Gianmarco Randazzo '}
        {new Date().getFullYear()}
      </Typography>
    </footer>
  )
}

export default Footer;
