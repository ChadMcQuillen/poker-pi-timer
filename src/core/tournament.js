import { tournamentSlice } from 'state/entities/tournamentSlice';
import store from 'state/store';

export default class Tournament {
    constructor( timerTickService, tournamentControlService ) {
        this.activeTournament = null;
        this.timerTickService = timerTickService;
        this.tournamentControlService = tournamentControlService;
        this.tournamentControlService.tournament.subscribe(
            value => {
                this.processTournamentUpdate( value );
            }
        );
    }

    startTimer() {
        this.timerSubscription = this.timerTickService.timerTickObservable.subscribe (t => {
            this.timerTick( t );
        } );
    }

    stopTimer() {
        if ( this.timerSubscription ) {
            this.timerSubscription.unsubscribe();
            this.timerSubscription = null;
        }
    }

    timerTick (t) {
        var update = { };
        this.activeTournament.secondsRemaining--;
        if ( this.activeTournament.secondsRemaining === 0 ) {
            if ( this.activeTournament.currentLevelIndex < this.activeTournament.levelsAndBreaks.length - 1 ) {
                this.activeTournament.currentLevelIndex++;
                this.activeTournament.secondsRemaining = this.activeTournament.levelsAndBreaks[ this.activeTournament.currentLevelIndex ].levelTime * 60;
                update.currentLevelIndex = this.activeTournament.currentLevelIndex;
                this.tournamentControlService.updateTournament( { currentLevelIndex: update.currentLevelIndex } );
            } else {
                this.stopTimer();
            }
        }
        update.id = this.activeTournament.id;
        update.secondsRemaining = this.activeTournament.secondsRemaining;
        store.dispatch( tournamentSlice.actions.update( update ));
    }

    processTournamentUpdate( tournamentUpdate ) {
        if ( this.activeTournament != null ) {
            if ( this.activeTournament.state !== tournamentUpdate.state ) {
                var stateTransition = this.activeTournament.state + '-to-' + tournamentUpdate.state;
                this.activeTournament.state = tournamentUpdate.state;
                switch ( stateTransition ) {
                    case 'pending-to-running':
                        this.startTimer();
                        break;
                    case 'running-to-paused':
                        this.stopTimer();
                        break;
                    case 'paused-to-running':
                        this.startTimer();
                        break;
                    case 'pending-to-done':
                    case 'running-to-done':
                    case 'paused-to-done':
                        this.stopTimer();
                        break;
                    default:
                        console.log( 'invalid state transition:  ', stateTransition );
                }
            }
            if ( this.activeTournament.currentLevelIndex !== tournamentUpdate.currentLevelIndex ) {
                this.activeTournament.currentLevelIndex = tournamentUpdate.currentLevelIndex;
                this.activeTournament.secondsRemaining = this.activeTournament.levelsAndBreaks[ this.activeTournament.currentLevelIndex ].levelTime * 60;
                tournamentUpdate.secondsRemaining = this.activeTournament.secondsRemaining;
            }
            tournamentUpdate.id = this.activeTournament.id;
            store.dispatch( tournamentSlice.actions.update( tournamentUpdate ));
            return;
        } else if ( tournamentUpdate.hasOwnProperty( 'state' ) ) {
            // new tournament
            tournamentUpdate.secondsRemaining = tournamentUpdate.levelsAndBreaks[ 0 ].levelTime * 60;
            this.activeTournament = tournamentUpdate;
            store.dispatch( tournamentSlice.actions.add( tournamentUpdate ));
            return;
        }
    }
}
