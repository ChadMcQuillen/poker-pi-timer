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

function constructLevelsAndBreaks( levels ) {
    var levelsAndBreaks = [];
    var levelIndex = 1;
    var breakIndex = 1;
    for ( var level = 0; level < levels.length; level++ ) {
        levelsAndBreaks.push(
            {
                levelType:  'Level',
                levelIndex: levelIndex,
                levelTime:  levels[ level ].levelTime,
                smallBlind: levels[ level ].smallBlind,
                bigBlind:   levels[ level ].bigBlind,
                ante:       levels[ level ].ante
            });
        if ( levels[ level ].breakTime > 0 &&
             level < levels.length - 1 ) {
             levelsAndBreaks.push(
                {
                    levelType:  'Break',
                    levelIndex: breakIndex,
                    levelTime:  levels[ level ].breakTime,
                    smallBlind: 0, // not used
                    bigBlind:   0, // not used
                    ante:       0  // not used
                });
            breakIndex++;
        }
        levelIndex++;
    }
    return levelsAndBreaks;
}

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
            levelsAndBreaks: constructLevelsAndBreaks( props.tournamentInfo.levels ),
            currentLevelIndex: 0,
            secondsRemaining: props.tournamentInfo.levels[ 0 ].levelTime * 60,
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
                  levelTitle = { this.state.levelsAndBreaks[ this.state.currentLevelIndex ].levelType }
                  level = { this.state.levelsAndBreaks[ this.state.currentLevelIndex ].levelIndex } />
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
                  showHours = { this.state.levelsAndBreaks[ this.state.currentLevelIndex ].levelTime >= 60 } />
              </div>
              <div className='blindsContainer'>
                <TournamentBlindsView
                  levels = { this.state.levelsAndBreaks }
                  levelIndex = { this.state.currentLevelIndex } />
              </div>
              <div className='nextLevelContainer'>
                <TournamentNextLevelView
                  levels = { this.state.levelsAndBreaks }
                  levelIndex = { this.state.currentLevelIndex } />
              </div>
            </div>
            <div className='rightColumn'>
               <TournamentBlindScheduleView
                  levels = { this.state.levelsAndBreaks }
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
