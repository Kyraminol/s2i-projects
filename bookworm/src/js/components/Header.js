import useStyles from '../styles';
import { Google } from './Google';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';


function Header(props){
  let classes = useStyles(props);

  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar className={classes.navbar}>
        <Typography variant="h6" color="inherit" noWrap className={classes.navbarTitle}>
          Bookworm
        </Typography>
        <Google setLogged={props.setLoggedUser}/>
      </Toolbar>
    </AppBar>
  )
}

export default Header;
