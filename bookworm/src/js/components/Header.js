import useStyles from '../styles';
import { Google } from './Google';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TranslateIcon from '@material-ui/icons/Translate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useTranslation} from 'react-i18next';


function Header(props){
  let classes = useStyles(props);

  const [, i18n] = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    i18n.changeLanguage(e.target.dataset.lang);
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar className={classes.navbar}>
        <Typography variant="h6" color="inherit" noWrap className={classes.navbarTitle}>
          Bookworm
        </Typography>
        <Button
          classes={{root: classes.TranslateButton}}
          size="large"
          onClick={handleMenu}
          endIcon={<ExpandMoreIcon/>}
        >
          <TranslateIcon/>
        </Button>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} data-lang="en">English</MenuItem>
          <MenuItem onClick={handleClose} data-lang="it">Italiano</MenuItem>
        </Menu>
        <Google setLogged={props.setLoggedUser}/>
      </Toolbar>
    </AppBar>
  )
}

export default Header;
