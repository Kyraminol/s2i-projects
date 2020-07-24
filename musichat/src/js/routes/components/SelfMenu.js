import UsernameDialog from './UsernameDialog';
import useStyles from '../../Styles';

import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';


const SelfMenu = (props) => {
  const classes = useStyles(props);
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [usernameDialogOpen, setUsernameDialogOpen] = React.useState(!Boolean(localStorage.getItem('username')));


  const menuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const menuClose = () => {
    setAnchorEl(null);
  };

  return(
    <>
      <IconButton
        onClick={menuOpen}
        color="inherit"
        classes={{label: classes.IconButtonLabel, root: classes.IconButtonRoot}}
      >
        <AccountCircle />
        <div>
          You
        </div>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        id="self-menu"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={menuClose}
      >
        <MenuItem onClick={() => {
          setUsernameDialogOpen(true);
          menuClose();
        }}>Edit Username</MenuItem>
      </Menu>
      <UsernameDialog open={[usernameDialogOpen, setUsernameDialogOpen]}/>
    </>
  )
};

export default SelfMenu;
