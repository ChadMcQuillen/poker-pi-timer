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

class TournamentBoardView extends React.Component {
    render() {
        return (
          <div className='tournamentBoard'>
            <div className='header'>
              <TournamentTitleView
                title = { this.props.tournament.tournamentInfo.title }
                description = { this.props.tournament.tournamentInfo.description } />
            </div>
            <div className='leftColumn'>
              <div className='levelContainer'>
                <TournamentLevelView
                  levelTitle = { this.props.tournament.tournamentInfo.levelsAndBreaks[ this.props.tournament.currentLevelIndex ].levelType }
                  level = { this.props.tournament.tournamentInfo.levelsAndBreaks[ this.props.tournament.currentLevelIndex ].levelIndex } />
              </div>
              <div className='entriesContainer'>
                <TournamentEntriesView
                  numberOfEntries = { this.props.tournament.numberOfEntrants } />
              </div>
              <div className='playersContainer'>
                <TournamentPlayersView
                  numberOfPlayersRemaining = { this.props.tournament.numberOfPlayersRemaining } />
              </div>
              <div className='rebuysContainer'>
                <TournamentRebuysView
                  numberOfRebuys = { this.props.tournament.numberOfRebuys } />
              </div>
              <div className='potContainer'>
                <TournamentPotView
                  pot = { calculatePot( this.props.tournament.tournamentInfo.buyIn,
                                        this.props.tournament.numberOfEntrants,
                                        this.props.tournament.numberOfRebuys ) } />
              </div>
            </div>
            <div className='centerArea'>
              <div className='timeContainer'>
                <TournamentTimerView
                  secondsRemaining = { this.props.tournament.secondsRemaining }
                  showHours = { this.props.tournament.tournamentInfo.levelsAndBreaks[ this.props.tournament.currentLevelIndex ].levelTime >= 60 } />
              </div>
              <div className='blindsContainer'>
                <TournamentBlindsView
                  levels = { this.props.tournament.tournamentInfo.levelsAndBreaks }
                  levelIndex = { this.props.tournament.currentLevelIndex } />
              </div>
              <div className='nextLevelContainer'>
                <TournamentNextLevelView
                  levels = { this.props.tournament.tournamentInfo.levelsAndBreaks }
                  levelIndex = { this.props.tournament.currentLevelIndex } />
              </div>
            </div>
            <div className='rightColumn'>
               <TournamentBlindScheduleView
                  levels = { this.props.tournament.tournamentInfo.levelsAndBreaks }
                  levelIndex = { this.props.tournament.currentLevelIndex } />
            </div>
            <div className='footer'>
               <TournamentPayoutsView
                  pot = { calculatePot( this.props.tournament.tournamentInfo.buyIn,
                                        this.props.tournament.numberOfEntrants,
                                        this.props.tournament.numberOfRebuys ) }
                  payoutPercentages = { this.props.tournament.payouts } />
            </div>
          </div>
        );
    }
}

export default TournamentBoardView;
