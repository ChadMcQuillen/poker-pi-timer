import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { getTournament } from 'state/entities/tournamentSlice';

const SplashScreen = ( props ) => {

  let history = useHistory();

  const {
    tournament
  } = props;

  useEffect( () => {
    const checkForActiveTournament = () => {
      if ( tournament && tournament.id ) {
        history.push( '/tournaments/active/' + tournament.id );
      }
    }
    checkForActiveTournament();
  }, [ history, tournament ] );

  return (
    <div>Loading...</div>
  );
};

const mapStateToProps = state => ({
  tournament: getTournament( state )
});

export default connect(
  mapStateToProps
)( SplashScreen );
