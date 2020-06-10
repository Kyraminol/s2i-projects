import React from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

function Book() {
  const [book, setBook] = React.useState({});
  let { id } = useParams();

  if(Object.keys(book).length === 0){
    axios.get('https://www.googleapis.com/books/v1/volumes/' + id).then((r) => {
      if(r.status === 200){
        setBook(r);
      }
    });
  }

  return (
    <BookComponent book={book}/>
  );
}

class BookComponent extends React.Component {
  render() {
    let classes = this.context;
    let props = this.props;
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
                <Grid item sm={4}>
                  <Box className={classes.image}>
                    <img className={classes.img} alt="complex" src={book.data ? book.data.volumeInfo.imageLinks.large : ""} />
                  </Box>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="h6">
                        {book.data.volumeInfo.title}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Full resolution 1920x1080 • JPEG
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        ID: 1030114
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2" style={{ cursor: 'pointer' }}>
                        Remove
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">$19.00</Typography>
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

export { Book };
