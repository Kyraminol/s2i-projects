import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';

function App() {
  const classes = useStyles();

  return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h5" color="inherit" noWrap> Bookworm </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <div className={classes.landing}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Bookworm
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Your personal cozy companion for searching and wishlisting books.
                </Typography>
              <Typography align="center" color="textSecondary" paragraph>
                I can remember which books you already completed and your progress at reading!
              </Typography>

            </Container>
          </div>
        </main>
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Credits
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">

          </Typography>
          <Copyright/>
        </footer>
      </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  landing: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(4),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

function Copyright() {
  return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © Gianmarco Randazzo '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
  );
}

export default App;
