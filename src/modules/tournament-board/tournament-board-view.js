import React from 'react';
import { TournamentTitleView } from './tournament-title-view';
import { TournamentLevelView } from './tournament-level-view';
import { TournamentEntriesView } from './tournament-entries-view';
import { TournamentPlayersView } from './tournament-players-view';
import { TournamentRebuysView } from './tournament-rebuys-view';
import { TournamentPotView } from './tournament-pot-view';
import { TournamentTimerView } from './tournament-timer-view';
import { TournamentBlindsView } from './tournament-blinds-view';
import { TournamentNextLevelView } from './tournament-next-level-view';
import { TournamentBlindScheduleView } from './tournament-blind-schedule-view';
import { TournamentPayoutsView } from './tournament-payouts-view';
import './css/tournament-board-view.css';

function calculatePot( buyinAmount, numberOfEntries, numberOfRebuys ) {
   return buyinAmount * ( numberOfEntries + numberOfRebuys );
}

export const TournamentBoardView = ( {
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
