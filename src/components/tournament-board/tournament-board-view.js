import React from 'react';
import TournamentTitleView from './tournament-title';
import TournamentLevelView from './tournament-level';
import TournamentEntriesView from './tournament-entries';
import TournamentPlayersView from './tournament-players';
import TournamentRebuysView from './tournament-rebuys';
import TournamentPotView from './tournament-pot';
import TournamentTimerView from './tournament-timer';
import TournamentBlindsView from './tournament-blinds';
import TournamentNextLevelView from './tournament-next-level';
import TournamentBlindScheduleView from './tournament-blind-schedule';
import TournamentPayoutsView from './tournament-payouts';
import './tournament-board-view.css';

function calculatePot( buyinAmount, numberOfEntries, numberOfRebuys ) {
   return buyinAmount * ( numberOfEntries + numberOfRebuys );
}

const TournamentBoardView = ( {
    title,
    description,
    buyIn,
    rebuyAmount,
    rebuyThroughLevel,
    levelsAndBreaks,
    currentLevelIndex,
    numberOfEntrants,
    numberOfPlayersRemaining,
    numberOfRebuys,
    payouts,
    secondsRemaining } ) => (
  <div className='tournamentBoard'>
    <div className='header'>
      <TournamentTitleView
        title = { title }
        description = { description } />
    </div>
    <div className='leftColumn'>
      <div className='levelContainer'>
        <TournamentLevelView
          levelTitle = { levelsAndBreaks[ currentLevelIndex ].levelType }
          level = { levelsAndBreaks[ currentLevelIndex ].levelIndex } />
      </div>
      <div className='entriesContainer'>
        <TournamentEntriesView
          numberOfEntries = { numberOfEntrants } />
      </div>
      <div className='playersContainer'>
        <TournamentPlayersView
          numberOfPlayersRemaining = { numberOfPlayersRemaining } />
      </div>
      <div className='rebuysContainer'>
        <TournamentRebuysView
          numberOfRebuys = { numberOfRebuys } />
      </div>
      <div className='potContainer'>
        <TournamentPotView
          pot = { calculatePot( buyIn, numberOfEntrants, numberOfRebuys ) } />
      </div>
    </div>
    <div className='centerArea'>
      <div className='timeContainer'>
        <TournamentTimerView
          secondsRemaining = { secondsRemaining }
          showHours = { levelsAndBreaks[ currentLevelIndex ].levelTime >= 60 } />
      </div>
      <div className='blindsContainer'>
        <TournamentBlindsView
          levels = { levelsAndBreaks }
          levelIndex = { currentLevelIndex } />
      </div>
      <div className='nextLevelContainer'>
        <TournamentNextLevelView
          levels = { levelsAndBreaks }
          levelIndex = { currentLevelIndex } />
      </div>
    </div>
    <div className='rightColumn'>
       <TournamentBlindScheduleView
          levels = { levelsAndBreaks }
          levelIndex = { currentLevelIndex } />
    </div>
    <div className='footer'>
       <TournamentPayoutsView
          pot = { calculatePot( buyIn, numberOfEntrants, numberOfRebuys ) }
          payoutPercentages = { payouts } />
    </div>
  </div>
);

export default TournamentBoardView;
