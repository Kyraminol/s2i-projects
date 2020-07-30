import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/core/Slider";
import useStyles from "../../Styles";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";

const VolumeButton = (props) => {
  const classes = useStyles(props);
  const [volume, setVolume] = props.volume;
  const [anchorEl, setAnchorEl] = React.useState(null);


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
