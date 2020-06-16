import useStyles from '../styles';
import { search } from './Search';
import GoogleContext from './Google';

import { isEqual } from 'lodash';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { Link, useHistory } from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ChevronRight from '@material-ui/icons/ChevronRight';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import SaveBookButton from './SaveBookButton';
import axios from 'axios';
import {useTranslation, Translation} from "react-i18next";


function BookLink(props){
  let history = useHistory();
  let classes = useStyles(props);

  function handleClick(){
    history.push('/search/'+document.getElementById('search-input').value);
  }

  return (
    <Link className={classes.Link} to={props.href} onClick={handleClick}>
      {props.children}
    </Link>
  )
}

function ResultCard(props){
  const classes = useStyles(props);
  const [t,] = useTranslation();
  let book = props.book;
  return (
    <Card className={classes.ResultCard}>
      <CardHeader
        classes={{
          content: classes.CardHeader
        }}
        titleTypographyProps={{variant: 'body1', className: classes.CardTitle}}
        subheaderTypographyProps={{variant: 'body2', className: classes.CardSubheader}}
        title={(<BookLink href={'/book/'+book.id}>{book.volumeInfo.title}</BookLink>)}
        subheader={(book.volumeInfo.authors || []).join(', ')}
      />
      <div className={classes.MediaRoot}>
        <BookLink href={'/book/'+book.id}>
          <CardMedia
            className={classes.Media}
            component='img'
            image={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail || book.volumeInfo.smallThumbnail : 'img/placeholder.jpg'}
            title={book.volumeInfo.title}
          />
        </BookLink>
        <div className={classes.MediaDescription}>
          <Box className={classes.SummaryBox}>
            <Typography variant="inherit" className={classes.MediaSummary}>
              { book.volumeInfo.description ? book.volumeInfo.description : t("search-no-summary")}
            </Typography>
          </Box>
          <BookLink href={'/book/'+book.id}>
            <Button
              variant="contained"
              color="primary"
              endIcon={<ChevronRight/>}
            >
              {t("search-details")}
            </Button>
          </BookLink>
        </div>
      </div>
      <CardActions disableSpacing className={classes.CardActions}>
        {Object.keys(props.bookshelves).length > 0 && <SaveBookButton bookshelves={props.bookshelves} book={book.id}/>}
      </CardActions>
    </Card>
  )
}

function ResultsGridItems(searchResults, bookshelves){
  let results = [];
  if(searchResults.data){
    if(searchResults.data.items){
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
    } else {
      results = (
        <Box mx="auto" pt={0}>
          <Translation>
            {
              (t) => <p>{t("search-no-results")}</p>
            }
          </Translation>
        </Box>
      );
    }
  }
  return results;
}

function SearchResults(props){
  const [searchResults, setSearchResults] = React.useState([]);
  const [bookshelves, setBookshelves] = React.useState({});
  const [lastSearchResults, setLastSearchResults] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [refreshCards, setRefreshCards] = React.useState(false);

  if(!loading && Object.keys(bookshelves).length === 0 && Object.keys(props.user).length > 0){
    setLoading(true);
    axios.get(
      'https://www.googleapis.com/books/v1/mylibrary/bookshelves',
      {
        headers: {
          'Authorization': 'Bearer ' + props.user.accessToken
        }
      }
    ).then((r) => {
      setBookshelves(r);
      setLoading(false);
      setRefreshCards(true);
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

  if(refreshCards){
    setRefreshCards(false);
    setSearchResults(ResultsGridItems(props.searchResults, bookshelves));
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
  const [t,] = useTranslation();

  return (
    <div align="center" className={classes.MoreButton}>
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
        {t("search-more")}
        <ExpandMore/>
      </Button>
      {loading && <CircularProgress size={32} className={classes.MoreButtonLoading} />}
    </div>
  )
}

export default SearchResultsComponent;
