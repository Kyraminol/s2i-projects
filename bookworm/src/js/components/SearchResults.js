import useStyles from '../styles';
import { search } from './Search';

import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CircularProgress from '@material-ui/core/CircularProgress';


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
        title={(<Link className={classes.link} to={'/book/'+book.id}>{book.volumeInfo.title}</Link>)}
        subheader={(book.volumeInfo.authors || []).join(', ')}
      />
      <div className={classes.mediaroot}>
        <Link to={'/book/' + book.id}>
          <CardMedia
            className={classes.media}
            component='img'
            image={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ''}
            title={book.volumeInfo.title}
          />
        </Link>
        <div className={classes.mediadescription}>
          { book.volumeInfo.description ? book.volumeInfo.description.substr(0, 300) + "... " : ""}
          <Link className={classes.link} to={'/book/' + book.id}>Details</Link>
        </div>
      </div>
      <CardActions disableSpacing className={classes.cardactions}>
        <IconButton aria-label="add to favorites" onClick={toggleFavorite}>
          <FavoriteIcon/>
        </IconButton>
      </CardActions>
    </Card>
  )
}

function toggleFavorite(id) {
  console.log(id);
}

function ResultsGridItems(searchResults){
  let results = [];
  searchResults.data.items.forEach((book) => {
    results.push(
      <Grid item key={book.id} xs={12} sm={6} md={4}>
        <ResultCard book={book}/>
      </Grid>
    )
  });
  return results;
}

function SearchResults(props){
  const [searchResults, setSearchResults] = React.useState([]);

  let more = "";
  if(props.searchResults.data !== undefined){
    if(searchResults.length === 0){
      setSearchResults(searchResults.concat(ResultsGridItems(props.searchResults)));
    }

    if(props.searchResults.data.totalItems > searchResults.length){
      more = (
        <MoreButton searchResults={searchResults} setSearchResults={setSearchResults}/>
      )
    }
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
                props.setSearchResults(props.searchResults.concat(ResultsGridItems(r)));
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

export default SearchResults;
