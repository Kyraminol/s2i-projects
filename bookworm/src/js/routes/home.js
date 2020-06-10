import React from "react";
import { SearchInput, GoogleContext} from "../components/search";

import {Link, useParams} from "react-router-dom";
import { useStyles } from "../styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ExpandMore from "@material-ui/icons/ExpandMore";


function Home(props){
  const [searchResults, setSearchResults] = React.useState({});
  let { query } = useParams();
  const classes = useStyles(props);

  return (
    <HomeComponent
      query={query}
      searchResults={searchResults}
      setSearchResults={setSearchResults}
      classes={classes}
    />
  )
}

class HomeComponent extends React.Component {
  render() {
    let props = this.props;
    let classes = props.classes;
    return (
      <div>
        <div className={classes.landing}>
          <Container maxWidth="sm">
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Your cozy companion for searching and wishlisting books.
            </Typography>
          </Container>
          <Container maxWidth="md" align="center">
            <SearchInput
              classes={classes}
              query={props.query}
              setSearchResults={props.setSearchResults}
            />
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="xl">
          <SearchResults
            classes={classes}
            searchResults={props.searchResults}
          />
        </Container>
      </div>
    );
  }
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


function SearchResults(props){
  //let classes = props.classes;
  let searchResults = props.searchResults;

  let result = [];
  let more = "";
  if(searchResults.data !== undefined){
    searchResults.data.items.forEach((book) => {
      result.push(
        <Grid item key={book.id} xs={12} sm={6} md={4}>
          <ResultCard book={book}/>
        </Grid>
      )
    });

    if(searchResults.data.totalItems > searchResults.data.items.length){
      more = (
        <MoreButton/>
      )
    }
  }
  return (
    <div>
      <Grid container spacing={4}>
        {result}
      </Grid>
      {more}
    </div>

  )
}

function MoreButton(props) {
  let classes = useStyles(props);
  return (
    <div align="center" className={classes.morebutton}>
      <Button variant="contained" color="primary" size="large" fullWidth={true}>
        More
        <ExpandMore/>
      </Button>
      <BookshelvesComponent/>
    </div>
  )
}


class BookshelvesComponent extends React.Component {
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

export default Home;
