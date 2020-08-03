// Component for a button that opens a menu for editing player properties

// Relative imports
import RoomContext from './RoomContext';
import LinkDialog from './LinkDialog';
import useStyles from '../../Styles';
// Module imports
import YouTubeIcon from '@material-ui/icons/YouTube';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


const PlayerMenu = (props) => {
  // Create classes names
  const classes = useStyles(props);
  // Import room variables from context
  const [room, setRoom] = React.useContext(RoomContext);
  // Anchor element for Player menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  // Link dialog open status
  const [linkDialogOpen, setLinkDialogOpen] = React.useState(false);
  // If anchorEl is present menu is open
  const open = Boolean(anchorEl);

  // Function to open Player menu
  const menuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to close Player menu
  const menuClose = () => {
    setAnchorEl(null);
  };

  // Function to toggle full Player visibility
  const togglePlayer = () => {
    setRoom((room) => {
      return {...room, 'player': !room.player}
    });
  };

  // Function to open the dialog to add links
  const openLinkDialog = () => {
    menuClose();
    setLinkDialogOpen(true);
  };

  return (
    <>
      {/* Button to open the menu */}
      <IconButton
        onClick={menuOpen}
        classes={{
          label: classes.IconButtonLabel,
          root: classes.IconButtonRoot
        }}
      >
        {/* Button icon */}
        <YouTubeIcon/>
        {/* Button text */}
        <div>
          Player
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
        open={open}
        onClose={menuClose}
      >
        {/* Menu items */}
        <MenuItem onClick={openLinkDialog}>Add URL</MenuItem>
        <MenuItem onClick={togglePlayer} disabled={!(room.url !== null && room.url !== '')}>{room.player ? 'Hide Player' : 'Show Player'}</MenuItem>
      </Menu>
      {/* Add link dialog, passing state as prop */}
      <LinkDialog open={[linkDialogOpen, setLinkDialogOpen]}/>
    </>
  )
}

export default PlayerMenu;
