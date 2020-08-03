// Component for a button that opens a menu for editing username

// Relative imports
import UsernameDialog from './UsernameDialog';
import useStyles from '../../Styles';
// Module imports
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const SelfMenu = (props) => {
  // Create classes names
  const classes = useStyles(props);
  // Anchor element for Self menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  // Dialog open status, initial state to true if local storage username is present
  const [usernameDialogOpen, setUsernameDialogOpen] = React.useState(!Boolean(localStorage.getItem('username')));

  // Function to open the menu
  const menuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to close the menu
  const menuClose = () => {
    setAnchorEl(null);
  };

  return(
    <>
      {/* Button to open the menu */}
      <IconButton
        onClick={menuOpen}
        color="inherit"
        classes={{label: classes.IconButtonLabel, root: classes.IconButtonRoot}}
      >
        {/* Button icon */}
        <AccountCircle/>
        {/* Button text */}
        <div>
          You
        </div>
      </IconButton>
      {/* Popout menu */}
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
        {/* Menu items */}
        <MenuItem onClick={() => {
          setUsernameDialogOpen(true);
          menuClose();
        }}>Edit Username</MenuItem>
      </Menu>
      {/* Username dialog, passing state as prop */}
      <UsernameDialog open={[usernameDialogOpen, setUsernameDialogOpen]}/>
    </>
  )
};

export default SelfMenu;
