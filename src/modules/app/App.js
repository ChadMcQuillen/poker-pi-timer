import React, { useEffect, useState } from 'react';
import './App.css';
import TimerTickService from 'core/timer-tick-service';
import GraphQLTournamentService from 'core/graphql-tournament-control-service';
import Tournament from 'core/tournament';
import { TournamentBoardView } from 'modules/tournament-board';

export const App = ( props ) => {

  const [ isLoading, setIsLoading ] = useState( true );
  const [ tournament, setTournament ] = useState( {} );

  useEffect( () => {
    const receiveTournamentUpdates = () => {
      const tournamentService = new Tournament( new TimerTickService(), new GraphQLTournamentService() );
      tournamentService.tournament.subscribe(
        value => {
          setTournament( prev => {
            return { ...prev, ...value };
          });
          if ( isLoading && value.hasOwnProperty( 'state' ) ) {
            setIsLoading( false );
          }
        }
      )
    };
    receiveTournamentUpdates();
  }, [] );

  const withLoadingIndicator = ( Component ) => {
    return function EnhancedComponent( { isLoading, ...props } ) {
      if ( !isLoading ) {
        return <Component { ...props } />;
      }
      return (
        <div>Loading...</div>
      );
    };
  };

  const TournamentBoardWithLoadingIndicator = withLoadingIndicator( TournamentBoardView );

  return (
    <TournamentBoardWithLoadingIndicator
      isLoading = { isLoading }
      title = { tournament.title }
      description = { tournament.description }
      buyIn = { tournament.buyIn }
      rebuyAmount = { tournament.rebuyAmount }
      rebuyThroughLevel = { tournament.rebuyThroughLevel }
      numberOfEntrants = { tournament.numberOfEntrants }
      numberOfPlayersRemaining = { tournament.numberOfPlayersRemaining }
      numberOfRebuys = { tournament.numberOfRebuys }
      currentLevelIndex = { tournament.currentLevelIndex }
      levelsAndBreaks = { tournament.levelsAndBreaks }
      payouts = { tournament.payouts }
      secondsRemaining = { tournament.secondsRemaining } />
  );
};
