import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

import React from 'react';
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

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Header/>
        <Main/>
        <Footer/>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
