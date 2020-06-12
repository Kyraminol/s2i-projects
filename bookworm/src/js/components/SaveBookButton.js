import GoogleContext from './Google';

import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FavoriteIcon from '@material-ui/icons/Favorite';
import axios from 'axios';


const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <FavoriteIcon/>
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

class MenuItemComponent extends React.Component {
  static contextType = GoogleContext;

  render() {
    let user = this.context;
    console.log(user);
    if(Object.keys(user).length > 0) {
      axios.get(
        'https://www.googleapis.com/books/v1/mylibrary/bookshelves',
        {
          headers: {
            'Authorization': 'Bearer ' + user.accessToken
          }
        }
      ).then((r) => {
        if (r.status === 200) {
        }
        console.log(r);
      });
    }

    return (
      <div>

      </div>
    )
  }

}
