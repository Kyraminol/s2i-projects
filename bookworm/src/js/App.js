import React from 'react';
import { Header } from './components/header';
import Main from './components/main';
import { Footer } from './components/footer';
import { GoogleContext } from './components/search'

import CssBaseline from '@material-ui/core/CssBaseline';
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
