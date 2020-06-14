import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FavoriteIcon from '@material-ui/icons/Favorite';


const ITEM_HEIGHT = 48;

export default function SaveBookButton(props) {
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
      {props.text ?
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleClick}
          endIcon={<FavoriteIcon/>}
        >
          {props.text}
        </Button>
      :
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <FavoriteIcon/>
        </IconButton>
      }


      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '40ch',
          },
        }}
      >
        {props.bookshelves.data.items.map((option) => (
          <MenuItem key={option.id} selected={option === 'Pyxis'} onClick={handleClose}>
            {option.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
