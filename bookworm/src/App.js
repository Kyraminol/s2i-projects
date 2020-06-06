import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputBase from '@material-ui/core/InputBase';
import deepPurple from '@material-ui/core/colors/deepPurple';
import {createMuiTheme, fade, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SearchIcon from '@material-ui/icons/Search';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import {BrowserRouter as Router, Switch, Route, useParams} from "react-router-dom";
import axios from 'axios';
import './App.css';

const ClassesContext = React.createContext({});

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: deepPurple,
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
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'min-content',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '40ch',
        '&:focus': {
          width: '100ch',
          height: '1.5rem',
        },
      },
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
            <Google/>
          </Toolbar>
        </AppBar>
        <main>
          <ClassesContext.Provider value={classes}>
            <Router>
              <Switch>
                <Route exact path="/">
                  <Home/>
                </Route>
                <Route path="/book/:id">
                  <Book/>
                </Route>
                <Route path="*">
                  <NotFound/>
                </Route>
              </Switch>
            </Router>
          </ClassesContext.Provider>
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

function Home(){
  const [searchResults, setSearchResults] = React.useState({});

  return (
    <HomeComponent
      searchResults={searchResults}
      setSearchResults={setSearchResults}
    />
  )
}

class HomeComponent extends React.Component {
  static contextType = ClassesContext;
  render() {
    let classes = this.context;
    let props = this.props;
    return (
      <div>
        <div className={classes.landing}>
          <Container maxWidth="sm">
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Your personal cozy companion for searching and wishlisting books.
            </Typography>
            <Typography align="center" color="textSecondary" paragraph>
              I can remember which books you already completed and your progress at reading!
            </Typography>
          </Container>
          <Container maxWidth="md" align="center">
            <SearchInput
              classes={classes}
              setSearchResults={props.setSearchResults}
            />
          </Container>
        </div>
        <div>
          <SearchResults
            classes={classes}
            searchResults={props.searchResults}
          />
        </div>
      </div>
    );
  }
}

function Google(){
  const [isLogged, setLogged] = React.useState(false);
  if(!isLogged){
    return (
      <GoogleLogin
        clientId="677208347872-r20r0a8f9at4n54vi59i47iemilm893i.apps.googleusercontent.com"
        buttonText="Sign in with Google"
        onSuccess={callbackLogin}
        onFailure={callbackLogin}
        cookiePolicy={'single_host_origin'}
        scope="https://www.googleapis.com/auth/drive.appdata"
      />
    )
  } else {
    return (
      <GoogleLogout
        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
        buttonText="Sign out"
        onLogoutSuccess={callbackLogout}
      />
    )
  }

  function callbackLogin(){
    setLogged(true);
  }

  function callbackLogout() {
    setLogged(false);
  }
}


function SearchInput(props){
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    const timeOutId = setTimeout(() => {
      if(typeof  query === 'string'){
        if(query.length > 2){
          axios.get('https://www.googleapis.com/books/v1/volumes?q=' + query).then((r) => {
            if(r.status === 200){
              props.setSearchResults(r);
            }
          });
        } else {
          props.setSearchResults({});
        }
      }
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [query, props]);
  let classes = props.classes;

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon/>
      </div>
      <InputBase
        placeholder="Search for books you love"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{'aria-label': 'search'}}
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
    </div>
  )
}

function SearchResults(props){
  //let classes = props.classes;
  let searchResults = props.searchResults;

  let result = "";
  console.log(searchResults);
  if(searchResults.data !== undefined){
    searchResults.data.items.forEach(book => {
    });
  }
  return result
}

function Book() {
  let { id } = useParams();
  return id;
}

function NotFound() {
  return '404';
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
