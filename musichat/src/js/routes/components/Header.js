import useStyles from '../../Styles';

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


function Header(props){
  let classes = useStyles(props);

  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar className={classes.Navbar}>
        <Typography variant="h6" color="inherit" noWrap className={classes.NavbarTitle}>
          Musichat
        </Typography>
        {props.menu}
      </Toolbar>
    </AppBar>
  )
}

export default Header;