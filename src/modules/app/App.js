import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import { TournamentBoardView } from 'modules/tournament-board';
import { SlideShow } from 'modules/slide-show';

export const App = () => {

  return (
    <Router>
      <Switch>
        <Route exact path = '/' component = { SlideShow } />
        <Route path = '/tournaments/active/:id' component = { TournamentBoardView } />
      </Switch>
    </Router>
  );
};
