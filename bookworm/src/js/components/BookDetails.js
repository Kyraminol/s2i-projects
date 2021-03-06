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
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GoogleContext from "./Google";
import CardActions from '@material-ui/core/CardActions';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import { useHistory } from 'react-router-dom';
import { Markup } from 'interweave';
import { useTranslation } from 'react-i18next';


function BookDetails(props){
  const [t,] = useTranslation();
  const classes = useStyles(props);

  return (
    <BookDetailsComponent {...props} classes={classes} t={t}/>
  )
}

function Back(props){
  let history = useHistory();
  let classes = useStyles(props);
  const [t,] = useTranslation();

  return (
    <Button
      classes={{root: classes.DetailsBackButton}}
      variant="contained"
      color="secondary"
      onClick={() => {history.goBack()}}
      startIcon={<ChevronLeft/>}
    >
      {t("details-back")}
    </Button>
  )
}

function Description(props){
  const [t,] = useTranslation();
  const classes = useStyles();
  return (
    <Box>
      <Typography gutterBottom variant="subtitle1" className={classes.DetailsBold}>{t('details-description')}</Typography>
      <Box className={classes.DetailsPaddingLeft}>
        <Markup content={props.children}/>
      </Box>
    </Box>
  )
}

class BookDetailsComponent extends React.Component {
  static contextType = GoogleContext;

  render() {
    let user = this.context;
    let props = this.props;
    let classes = props.classes;
    let book = props.book;
    let t = props.t;

    if(Object.keys(book).length === 0){
      return (
        <Backdrop open={true}>
          <CircularProgress color="inherit" size={'8rem'} />
        </Backdrop>
      )
    } else {
      return (
        <Container className={classes.BookContainer}>
          <Back/>
          <div className={classes.PaperRoot}>
            <Paper className={classes.Paper}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                  <Box className={classes.ImageRoot} maxWidth={200}>
                    <img className={classes.Image} alt="" src={book.data ? book.data.volumeInfo.imageLinks.large || book.data.volumeInfo.imageLinks.medium || book.data.volumeInfo.imageLinks.small || book.data.volumeInfo.imageLinks.thumbnail || book.data.volumeInfo.smallThumbnail : 'img/placeholder.jpg'} />
                  </Box>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Box className={classes.DetailsHeader}>
                        <Typography variant="h6">
                          {book.data.volumeInfo.title}
                        </Typography>
                        <Typography variant="body2" gutterBottom className={classes.DetailsPaddingLeft}>
                          {(book.data.volumeInfo.authors || []).join(', ')}
                        </Typography>
                      </Box>
                      {book.data ? (book.data.volumeInfo.description ? <Description>{book.data.volumeInfo.description}</Description> : t("details-no-description")) : ""}
                      <Box className={classes.DetailsBoxMore}>
                        <Typography gutterBottom variant="subtitle1" className={classes.DetailsBold}>{t('details-more')}</Typography>
                        <Grid container spacing={3} className={classes.DetailsPaddingLeft}>
                          {book.data && book.data.volumeInfo.publisher &&
                          <Grid item xs={6} md={3}>
                            <Typography className={classes.DetailsBold}>{t('details-publisher')}</Typography>
                            <Typography>{book.data.volumeInfo.publisher}</Typography>
                          </Grid>
                          }
                          {book.data && book.data.volumeInfo.publishedDate &&
                          <Grid item xs={6} md={3}>
                            <Typography className={classes.DetailsBold}>{t('details-published-date')}</Typography>
                            <Typography>{book.data.volumeInfo.publishedDate}</Typography>
                          </Grid>
                          }
                          {book.data && book.data.volumeInfo.pageCount &&
                          <Grid item xs={6} md={3}>
                            <Typography className={classes.DetailsBold}>{t('details-pages')}</Typography>
                            <Typography>{book.data.volumeInfo.pageCount}</Typography>
                          </Grid>
                          }
                          {book.data && book.data.volumeInfo.industryIdentifiers && book.data.volumeInfo.industryIdentifiers.length > 0 &&
                          <Grid item xs={6} md={3}>
                            <Typography className={classes.DetailsBold}>ISBN</Typography>
                            <Typography>{book.data.volumeInfo.industryIdentifiers[book.data.volumeInfo.industryIdentifiers.length-1].identifier}</Typography>
                          </Grid>
                          }
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item>
                      <CardActions className={classes.CardActions}>
                        {book.data && book.data.volumeInfo.infoLink &&
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            href={book.data.volumeInfo.infoLink}
                          >
                            {t("details-store")}
                          </Button>
                        }
                        {book.data && book.data.accessInfo.viewability !== 'NO_PAGES' && book.data.accessInfo.webReaderLink &&
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            href={book.data.accessInfo.webReaderLink}
                          >
                            {t("details-preview")}
                          </Button>
                        }
                      </CardActions>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <Box alignContent="right">
                      <CardActions disableSpacing className={classes.CardActions}>
                        <SaveBook user={user} book={book.data.id}/>
                      </CardActions>
                    </Box>
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
      <SaveBookButton bookshelves={bookshelves} book={props.book}/>
    )
  } else {
    return ""
  }
}

export default BookDetails;
