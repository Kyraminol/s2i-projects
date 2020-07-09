import Home from './routes/Home';
import Room from './routes/Room';

import React from 'react';
import red from '@material-ui/core/colors/red';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';


function App() {
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: red,
          type: 'dark',
        },
      }),
    [],
  );

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Router>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/room/:name" component={Room}/>
          </Switch>
        </Router>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
