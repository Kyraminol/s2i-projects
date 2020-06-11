import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import GoogleContext from './components/Google';
import CssBaseline from '@material-ui/core/CssBaseline';

import React from 'react';
import deepPurple from '@material-ui/core/colors/deepPurple';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


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

  const [loggedUser, setLoggedUser] = React.useState({});

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <GoogleContext.Provider value={loggedUser}>
          <CssBaseline/>
          <Header setLoggedUser={setLoggedUser}/>
          <Main/>
          <Footer/>
        </GoogleContext.Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
