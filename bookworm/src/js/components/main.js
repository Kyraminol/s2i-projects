import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "../routes/home";
import { Book } from "../routes/book"
import React from "react";

function Main(){
  return (
    <main>
      <Router>
        <Switch>
          <Route exact path="/" component={RouterComponent}>
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
    </main>
  )
}

class RouterComponent extends React.Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    const locationChanged = this.props.location !== prevProps.location;
    console.log(locationChanged);
  }
}

function NotFound() {
  return '404';
}

export default Main;
