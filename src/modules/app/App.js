import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import TimerTickService from 'core/timer-tick-service';
import GraphQLTournamentControlService from 'core/graphql-tournament-control-service';
import Tournament from 'core/tournament';
import { TournamentBoardView } from 'modules/tournament-board';
import { SplashScreen } from 'modules/splash-screen';

export const App = () => {

  useEffect( () => {
    new Tournament( new TimerTickService(), new GraphQLTournamentControlService() );
  }, [] );

  return (
    <Router>
      <Switch>
        <Route exact path = '/' component = { SplashScreen } />
        <Route path = '/tournaments/active/:id' component = { TournamentBoardView } />
      </Switch>
    </Router>
  );
};
