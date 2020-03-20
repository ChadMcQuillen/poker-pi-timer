import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import { TournamentBoardView } from 'modules/tournament-board';
import { SplashScreen } from 'modules/splash-screen';

export const App = () => {

  return (
    <Router>
      <Switch>
        <Route exact path = '/' component = { SplashScreen } />
        <Route path = '/tournaments/active/:id' component = { TournamentBoardView } />
      </Switch>
    </Router>
  );
};
