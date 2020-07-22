import YouTubeIcon from "@material-ui/icons/YouTube";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import useStyles from "../../Styles";
import Menu from "@material-ui/core/Menu";
import LinkDialog from "./LinkDialog";


function PlayerMenu(props){
  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [linkDialogOpen, setLinkDialogOpen] = React.useState(false);
  const open = Boolean(anchorEl);

  const menuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const menuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        onClick={menuOpen}
        classes={{
          label: classes.IconButtonLabel,
          root: classes.IconButtonRoot
        }}
      >
        <YouTubeIcon/>
        <div>
          Player
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
        open={open}
        onClose={menuClose}
      >
        <MenuItem onClick={() => {setLinkDialogOpen(true)}}>Add URL</MenuItem>
        <MenuItem onClick={() => {}}>Show Player</MenuItem>
      </Menu>
      <LinkDialog open={[linkDialogOpen, setLinkDialogOpen]}/>
    </div>
  )
}

export default PlayerMenu;
