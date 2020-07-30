// Relative imports
import useStyles from '../../Styles';
// Module imports
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from '@material-ui/core/Slider';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

const VolumeButton = (props) => {
  // Create classes names
  const classes = useStyles(props);
  // Unpack useState from props
  const [volume, setVolume] = props.volume;
  // Anchor element for Volume Menu
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Function to open the Volume Menu
  const menuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to close the Volume Menu
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
        <VolumeUpIcon/>
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
        MenuListProps={{className: classes.VolumeMenuList}}
      >
        <MenuItem disableRipple focusVisibleClassName={classes.VolumeMenuItem}>
          <Slider
            orientation="vertical"
            value={volume}
            onChange={(e, newValue) => {setVolume(newValue)}}
            style={{height: "100px"}}
          />
        </MenuItem>
      </Menu>
    </>
  )
};


export default VolumeButton;
