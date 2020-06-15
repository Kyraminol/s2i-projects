import useStyles from '../styles';
import { search } from './Search';
import GoogleContext from './Google';

import { isEqual } from 'lodash';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link, useHistory } from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ChevronRight from '@material-ui/icons/ChevronRight';
import CircularProgress from '@material-ui/core/CircularProgress';
import SaveBookButton from './SaveBookButton';
import axios from 'axios';


function BookLink(props){
  let history = useHistory();
  let classes = useStyles(props);

  function handleClick(){
    history.push('/search/'+document.getElementById('search-input').value);
  }

  return (
    <Link className={classes.link} to={props.href} onClick={handleClick}>
      {props.children}
    </Link>
  )
}

function ResultCard(props){
  let classes = useStyles(props);
  let book = props.book;
  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        classes={{
          content: classes.cardheader
        }}
        titleTypographyProps={{variant: 'body1'}}
        subheaderTypographyProps={{variant: 'body2', className: ''}}
        title={(<BookLink href={'/book/'+book.id}>{book.volumeInfo.title}</BookLink>)}
        subheader={(book.volumeInfo.authors || []).join(', ')}
      />
      <div className={classes.mediaroot}>
        <BookLink href={'/book/'+book.id}>
          <CardMedia
            className={classes.media}
            component='img'
            image={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail || book.volumeInfo.smallThumbnail : ''}
            title={book.volumeInfo.title}
          />
        </BookLink>
        <div className={classes.mediadescription}>
          { book.volumeInfo.description ? book.volumeInfo.description.substr(0, 300) + "... " : "No description available"}
          <br/><BookLink href={'/book/'+book.id}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<ChevronRight/>}
            >
              Details
            </Button>
          </BookLink>
        </div>
      </div>
      <CardActions disableSpacing className={classes.cardactions}>
        <SaveBookButton bookshelves={props.bookshelves}/>
      </CardActions>
    </Card>
  )
}

function ResultsGridItems(searchResults, bookshelves){
  let results = [];
  searchResults.data.items.forEach((book) => {
    results.push(
      <Grid item key={book.id} xs={12} sm={6} md={4}>
        <ResultCard
          book={book}
          bookshelves={bookshelves}
        />
      </Grid>
    )
  });
  return results;
}

function SearchResults(props){
  const [searchResults, setSearchResults] = React.useState([]);
  const [bookshelves, setBookshelves] = React.useState({});
  const [lastSearchResults, setLastSearchResults] = React.useState({});

  if(Object.keys(bookshelves).length === 0 && Object.keys(props.user).length > 0){
    axios.get(
      'https://www.googleapis.com/books/v1/mylibrary/bookshelves',
      {
        headers: {
          'Authorization': 'Bearer ' + props.user.accessToken
        }
      }
    ).then((r) => {
      setBookshelves(r);
    });
  }

  let more = "";
  if(!isEqual(lastSearchResults, props.searchResults)){
    if(props.searchResults.data !== undefined){
      setLastSearchResults(props.searchResults);
      setSearchResults(ResultsGridItems(props.searchResults, bookshelves));
    } else {
      setSearchResults([]);
      setLastSearchResults({});
    }
  }

  if(props.searchResults.data !== undefined && props.searchResults.data.totalItems > searchResults.length){
    more = (
      <MoreButton searchResults={searchResults} setSearchResults={setSearchResults} bookshelves={bookshelves}/>
    )
  }

  return (
    <div>
      <Grid container spacing={4}>
        {searchResults}
      </Grid>
      {more}
    </div>

  )
}

class SearchResultsComponent extends React.Component {
  static contextType = GoogleContext;

  render() {
    let user = this.context;

    return (
      <SearchResults user={user} {...this.props}/>
    )
  }
}

function MoreButton(props) {
  const [loading, setLoading] = React.useState(false);
  const classes = useStyles(props);

  return (
    <div align="center" className={classes.morebutton}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth={true}
        disabled={loading}
        onClick={
          function(){
            setLoading(true);
            let query = document.getElementById('search-input').value;
            search(query, props.searchResults.length).then((r) => {
              if(r.status === 200){
                props.setSearchResults(props.searchResults.concat(ResultsGridItems(r, props.bookshelves)));
                setLoading(false);
              }
            });
          }
        }>
        More
        <ExpandMore/>
      </Button>
      {loading && <CircularProgress size={32} className={classes.MoreButtonLoading} />}
    </div>
  )
}

export default SearchResultsComponent;
