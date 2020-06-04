import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  const classes = makeStyles((theme) => ({
    '@global': {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
    },
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
      flexWrap: 'wrap',
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    icon: {
      marginRight: theme.spacing(2),
    },
    landing: {
      backgroundColor: theme.palette.background.paper,
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }), {defaultTheme: theme})();

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" color="primary" elevation={0} className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
              Bookworm
            </Typography>
            <Button href="#" color="inherit" variant="outlined" className={classes.link}>
              Login with Google
            </Button>
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
            <Container maxWidth="md">
              <form className={classes.root} noValidate autoComplete="off">
                <TextField id="search-input" placeholder="Search for books you love" variant="outlined" fullWidth margin="normal" InputLabelProps={{shrink: true,}}/>
              </form>
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
      </ThemeProvider>
    </React.Fragment>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Gianmarco Randazzo '}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default App;
