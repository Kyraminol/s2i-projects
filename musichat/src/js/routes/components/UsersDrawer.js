// Component for a button that opens a drawer with the user list

// Relative imports
import RoomContext from './RoomContext';
import useStyles from '../../Styles';
// Module imports
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import GroupIcon from '@material-ui/icons/Group';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const UsersDrawer = (props) => {
  // Create classes names
  const classes = useStyles(props);
  // Import room variables from context
  const [room,] = React.useContext(RoomContext);
  // State and setter for opening the drawer
  const [open, setOpen] = React.useState(false);

  // Function to open the drawer
  const openDrawer = () => {
    setOpen(true);
  };

  // Function to close the drawer
  const closeDrawer = () => {
    setOpen(false);
  };

  return(
    <>
      {/* Button to trigger drawer opening */}
      <IconButton
        color="inherit"
        onClick={openDrawer}
        classes={{
          label: classes.IconButtonLabel,
          root: classes.IconButtonRoot
        }}
      >
        {/* Button icon */}
        <GroupIcon/>
        {/* Button text */}
        <div>
          Users
        </div>
      </IconButton>
      {/* Users list drawer */}
      <Drawer anchor="right" open={open} onClose={closeDrawer}>
        <List>
          {/* Check if there are users on the list */}
          { room.users.length > 0 ? (
            <>
              <ListItem disabled button className={classes.UsersListTitle}>
                <ListItemText primary="Users online"/>
              </ListItem>
              {/* Iterate user list and add items to the drawer */}
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
              {/* Add message when there are no users online */}
              <ListItemText primary="No other users online"/>
            </ListItem>
          ) }
        </List>
      </Drawer>
    </>
  )
};

export default UsersDrawer;
