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

class TournamentBoardView extends React.Component {
    render() {
        return (
          <div className='tournamentBoard'>
            <div className='header'>
              <TournamentTitleView />
            </div>
            <div className='leftColumn'>
              <div className='levelContainer'>
              </div>
              <div className='entriesContainer'>
                <TournamentEntriesView />
              </div>
              <div className='playersContainer'>
                <TournamentPlayersView />
              </div>
              <div className='rebuysContainer'>
                <TournamentRebuysView />
              </div>
              <div className='potContainer'>
                <TournamentPotView />
              </div>
            </div>
            <div className='centerArea'>
              <div className='timeContainer'>
                <TournamentTimerView />
              </div>
              <div className='blindsContainer'>
                <TournamentBlindsView />
              </div>
              <div className='nextLevelContainer'>
                <TournamentNextLevelView />
              </div>
            </div>
            <div className='rightColumn'>
               <TournamentBlindScheduleView />
            </div>
            <div className='footer'>
               <TournamentPayoutsView />
            </div>
          </div>
        );
    }
}

export default TournamentBoardView;
