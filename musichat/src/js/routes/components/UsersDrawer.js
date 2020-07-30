import IconButton from "@material-ui/core/IconButton";
import GroupIcon from "@material-ui/icons/Group";
import React from "react";
import useStyles from "../../Styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import RoomContext from "./RoomContext";


const UsersDrawer = (props) => {
  const [room,] = React.useContext(RoomContext);
  const classes = useStyles(props);
  const [open, setOpen] = React.useState(false);

  const openDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  return(
    <>
      <IconButton
        color="inherit"
        onClick={openDrawer}
        classes={{
          label: classes.IconButtonLabel,
          root: classes.IconButtonRoot
        }}
      >
        <GroupIcon />
        <div>
          Users
        </div>
      </IconButton>
      <Drawer anchor="right" open={open} onClose={closeDrawer}>
        <List>
          { room.users.length > 0 ? (
            <>
              <ListItem disabled button className={classes.UsersListTitle}>
                <ListItemText primary="Users online"/>
              </ListItem>
              { room.users.map((user, index) => {
                if(room.username === user.name) return undefined;
                return (
                  <ListItem button key={index} className={classes.UsersListUser}>
                    <ListItemText primary={user.name}/>
                  </ListItem>
                )
              }) }
            </>
          ) : (
            <ListItem disabled button className={classes.UsersListTitle}>
              <ListItemText primary="No other users online"/>
            </ListItem>
          ) }
        </List>
      </Drawer>
    </>
  )
};

export default UsersDrawer;
