// Component for the footer skeleton

// Relative imports
import useStyles from '../../Styles';
// Module imports
import React from 'react';
import Typography from '@material-ui/core/Typography';


const Footer = (props) => {
  // Create classes names
  let classes = useStyles(props);

  return (
    <footer className={classes.Footer}>
      {/* Footer copyright */}
      <Typography variant="body2" color="textSecondary" align="center">
        Copyright © Gianmarco Randazzo{" "}
        {/* Print current year */}
        {new Date().getFullYear()}
      </Typography>
    </footer>
  )
}

export default Footer;
