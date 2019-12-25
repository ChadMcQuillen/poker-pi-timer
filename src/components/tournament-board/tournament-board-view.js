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
    constructor( props ) {
        super( props );

        this.state = {
            numberOfEntrants: 10,
            numberOfPlayersRemaining: 10,
            numberOfRebuys: 0,
            currentLevelIndex: 0,
            secondsRemaining: props.tournamentInfo.levelsAndBreaks[ 0 ].levelTime * 60,
            payouts: [ 0.6, 0.3, 0.1 ],
            tournamentState: 'start-pending'
        };
    }

    render() {
        return (
          <div className='tournamentBoard'>
            <div className='header'>
              <TournamentTitleView
                title = { this.props.tournamentInfo.title }
                description = { this.props.tournamentInfo.description } />
            </div>
            <div className='leftColumn'>
              <div className='levelContainer'>
                <TournamentLevelView
                  levelTitle = { this.props.tournamentInfo.levelsAndBreaks[ this.state.currentLevelIndex ].levelType }
                  level = { this.props.tournamentInfo.levelsAndBreaks[ this.state.currentLevelIndex ].levelIndex } />
              </div>
              <div className='entriesContainer'>
                <TournamentEntriesView
                  numberOfEntries = { this.state.numberOfEntrants } />
              </div>
              <div className='playersContainer'>
                <TournamentPlayersView
                  numberOfPlayersRemaining = { this.state.numberOfPlayersRemaining } />
              </div>
              <div className='rebuysContainer'>
                <TournamentRebuysView
                  numberOfRebuys = { this.state.numberOfRebuys } />
              </div>
              <div className='potContainer'>
                <TournamentPotView
                  pot = { calculatePot( this.props.tournamentInfo.buyIn,
                                        this.state.numberOfEntrants,
                                        this.state.numberOfRebuys ) } />
              </div>
            </div>
            <div className='centerArea'>
              <div className='timeContainer'>
                <TournamentTimerView
                  secondsRemaining = { this.state.secondsRemaining }
                  showHours = { this.props.tournamentInfo.levelsAndBreaks[ this.state.currentLevelIndex ].levelTime >= 60 } />
              </div>
              <div className='blindsContainer'>
                <TournamentBlindsView
                  levels = { this.props.tournamentInfo.levelsAndBreaks }
                  levelIndex = { this.state.currentLevelIndex } />
              </div>
              <div className='nextLevelContainer'>
                <TournamentNextLevelView
                  levels = { this.props.tournamentInfo.levelsAndBreaks }
                  levelIndex = { this.state.currentLevelIndex } />
              </div>
            </div>
            <div className='rightColumn'>
               <TournamentBlindScheduleView
                  levels = { this.props.tournamentInfo.levelsAndBreaks }
                  levelIndex = { this.state.currentLevelIndex } />
            </div>
            <div className='footer'>
               <TournamentPayoutsView
                  pot = { calculatePot( this.props.tournamentInfo.buyIn,
                                        this.state.numberOfEntrants,
                                        this.state.numberOfRebuys ) }
                  payoutPercentages = { this.state.payouts } />
            </div>
          </div>
        );
    }
}

export default TournamentBoardView;
