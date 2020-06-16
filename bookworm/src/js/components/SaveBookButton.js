import GoogleContext from './Google';
import React, {useContext} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {useTranslation} from 'react-i18next';
import axios from 'axios';
import useStyles from '../styles';
import CircularProgress from "@material-ui/core/CircularProgress";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';



const ITEM_HEIGHT = 48;
const READ_ONLY = ['Purchased', 'Reviewed', 'Recently viewed', 'Books for you'];

export default function SaveBookButton(props) {
  const [t,] = useTranslation();
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
        {props.bookshelves.data ? props.bookshelves.data.items.map((option) => (
          (option.id < 1000 && READ_ONLY.includes(option.title) ?
          "" :
            <BookshelfComponent bookshelf={option} book={props.book} key={option.id} close={handleClose}/>)
        )) : (
          <MenuItem onClick={handleClose}>
            {t('bookshelves-notfound')}
              <br/>
            {t('bookshelves-login')}
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}

class BookshelfComponent extends React.Component{
  render() {
    return (
      <Bookshelf {...this.props}/>
    )
  }
}

function Bookshelf(props){
  const classes = useStyles(props);
  const book = props.book;
  const user = useContext(GoogleContext);
  const bookshelf = props.bookshelf;
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);

  function handleClick(){
    setLoading(true);
    axios.post(
      'https://www.googleapis.com/books/v1/mylibrary/bookshelves/' + bookshelf.id + '/addVolume?volumeId=' + book,
      {},
      {
        headers: {
          'Authorization': 'Bearer ' + user.accessToken
        }
      }
    ).then((r) => {
      setLoading(false);
      setDone(true);
      console.log(r);
    });
  }

  return(
    <MenuItem onClick={handleClick} className={classes.BookshelvesRoot}>
      <ListItemText>
        {bookshelf.title}
      </ListItemText>
      {loading && <CircularProgress size={30} className={classes.BookshelvesLoading}/>}
      {done && <ListItemIcon>
        <FavoriteIcon/>
      </ListItemIcon>}
    </MenuItem>
  )
}
