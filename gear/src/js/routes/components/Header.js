// Component for the navbar skeleton

// Relative imports
import useStyles from '../../Styles';
// Module imports
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const Header = (props) => {
  // Create classes names
  let classes = useStyles(props);

  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar className={classes.Navbar}>
        {/* Navbar title */}
        <Typography variant="h6" color="inherit" noWrap className={classes.NavbarTitle}>
          Gear
        </Typography>
        {/* Add menu buttons from props */}
        {props.menu}
      </Toolbar>
    </AppBar>
  )
}

export default Header;
