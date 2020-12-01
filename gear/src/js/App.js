// Main App

// Relative imports
import Home from './routes/Home';
// Module imports
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import useStyles from "./Styles";


const App = (props) => {
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: blue,
          type: 'dark',
        },
      }),
    [],
  );
  // Create classes names
  let classes = useStyles(props);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <div className={classes.Root}>
          <CssBaseline/>
          <Router>
            <Switch>
              <Route exact path="/" component={Home}/>
            </Switch>
          </Router>
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
