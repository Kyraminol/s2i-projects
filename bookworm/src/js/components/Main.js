import Book from '../routes/BookDetailsRoute';
import HomeRoute from '../routes/HomeRoute';

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function Main(){
  return (
    <main>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomeRoute/>
          </Route>
          <Route path="/search/:query">
            <HomeRoute/>
          </Route>
          <Route path="/book/:id">
            <Book/>
          </Route>
          <Route path="*">
            <HomeRoute/>
          </Route>
        </Switch>
      </Router>
    </main>
  )
}

export default Main;
