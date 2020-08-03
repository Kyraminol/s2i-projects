// Main App

// Relative imports
import Home from './routes/Home';
import Room from './routes/Room';
// Module imports
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';


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
