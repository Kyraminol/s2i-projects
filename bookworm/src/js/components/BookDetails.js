import useStyles from '../styles';
import SaveBookButton from './SaveBookButton';

import React from 'react';
import axios from 'axios';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import GoogleContext from "./Google";
import CardActions from '@material-ui/core/CardActions';


function BookDetails(props){
  const classes = useStyles(props);

  return (
    <BookDetailsComponent {...props} classes={classes}/>
  )
}

class BookDetailsComponent extends React.Component {
  static contextType = GoogleContext;

  render() {
    let user = this.context;
    let props = this.props;
    let classes = props.classes;
    let book = props.book;

    if(Object.keys(book).length === 0){
      return (
        <Backdrop open={true}>
          <CircularProgress color="inherit" size={'8rem'} />
        </Backdrop>
      )
    } else {
      return (
        <Container className={classes.bookcontainer}>
          <div className={classes.roodt}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item alignContent="center" alignItems="center" xs={12} sm={2} justify="center">
                  <Box className={classes.image} maxWidth={200}>
                    <img className={classes.img} alt="" src={book.data ? book.data.volumeInfo.imageLinks.large || book.data.volumeInfo.imageLinks.medium || book.data.volumeInfo.imageLinks.small || book.data.volumeInfo.imageLinks.thumbnail || book.data.volumeInfo.smallThumbnail : ""} />
                  </Box>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="h6">
                        {book.data.volumeInfo.title}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {(book.data.volumeInfo.authors || []).join(', ')}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {book.data ? book.data.volumeInfo.description : ""}
                      </Typography>
                    </Grid>
                    <Grid item>

                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={1} alignContent="right">
                    <CardActions disableSpacing className={classes.cardactions}>
                      <SaveBook user={user}/>
                    </CardActions>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </div>
        </Container>
      )
    }
  }
}

function SaveBook(props){
  const [bookshelves, setBookshelves] = React.useState({});

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

  if(Object.keys(bookshelves).length > 0){
    return (
      <SaveBookButton bookshelves={bookshelves}/>
    )
  } else {
    return ""
  }
}

export default BookDetails;
