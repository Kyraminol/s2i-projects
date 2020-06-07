import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputBase from '@material-ui/core/InputBase';
import deepPurple from '@material-ui/core/colors/deepPurple';
import {createMuiTheme, fade, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import {BrowserRouter as Router, Route, Switch, useParams, Link} from "react-router-dom";
import axios from 'axios';
import './App.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';

const ClassesContext = React.createContext({});

function App() {
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: deepPurple,
          type: 'dark',
        },
      }),
    [],
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
    root: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    },
    media: {
      height: 'min-content',
      width: 'min-content',
      display: 'inline-block',
      paddingLeft: '20px'
    },
    avatar: {
      backgroundColor: red[500],
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    cardactions: {
      justifyContent: "end",
    }
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
                <Route path="/search/:query">
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
  let { query } = useParams();

  return (
    <HomeComponent
      query={query}
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
        scope="https://www.googleapis.com/auth/books"
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
  if(query === "" && props.query){
    setQuery(props.query);
  }

  React.useEffect(() => {
    const timeOutId = setTimeout(() => {
      if(typeof  query === 'string'){
        if(query.length > 2){
          axios.get('https://www.googleapis.com/books/v1/volumes?maxResults=12&q=' + query).then((r) => {
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

class ResultCard extends React.Component {
  static contextType = ClassesContext;

  render() {
    let classes = this.context;
    let props = this.props;
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
          subheaderTypographyProps={{variant: 'body2'}}
          title={book.volumeInfo.title}
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

        </div>
        <CardActions disableSpacing className={classes.cardactions}>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon/>
          </IconButton>
        </CardActions>
      </Card>
    )
  }
}


function SearchResults(props){
  //let classes = props.classes;
  let searchResults = props.searchResults;

  let result = [];
  console.log(searchResults);
  if(searchResults.data !== undefined){
    searchResults.data.items.forEach((book) => {
      result.push(
        <Grid item key={book.id} xs={12} sm={6} md={4}>
          <ResultCard book={book}/>
        </Grid>
      )
    });
  }
  return (
    <Grid container spacing={4}>
      {result}
    </Grid>
  )
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
