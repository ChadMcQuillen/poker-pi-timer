import { BehaviorSubject } from 'rxjs';

export default class Tournament {
    constructor( timerTickService, tournamentControlService ) {
        this.timerTickService = timerTickService;
        this.tournamentControlService = tournamentControlService;
        this.secondsRemaining = 0;
        this.tournament = new BehaviorSubject( { } );
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
        var tournamentUpdate = this.tournament.value;
        this.secondsRemaining--;
        if ( this.secondsRemaining === 0 ) {
            if ( tournamentUpdate.currentLevelIndex < tournamentUpdate.tournamentInfo.levelsAndBreaks.length - 1 ) {
                tournamentUpdate.currentLevelIndex++;
                this.secondsRemaining = tournamentUpdate.tournamentInfo.levelsAndBreaks[ tournamentUpdate.currentLevelIndex ].levelTime * 60;
            } else {
                this.stopTimer();
            }
        }
        tournamentUpdate.secondsRemaining = this.secondsRemaining;
        this.tournament.next( tournamentUpdate );
    }

    processTournamentUpdate( tournamentUpdate ) {
        if ( this.tournament.value.hasOwnProperty( 'state' ) ) {
            if ( this.tournament.value.state !== tournamentUpdate.state ) {
                var stateTransition = this.tournament.value.state + '-to-' + tournamentUpdate.state;
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
        } else if ( tournamentUpdate.hasOwnProperty( 'state' ) ) {
            // new tournament
            this.secondsRemaining = tournamentUpdate.tournamentInfo.levelsAndBreaks[ 0 ].levelTime * 60;
        }
        tournamentUpdate.payouts = [ 1.0 ];
        tournamentUpdate.secondsRemaining = this.secondsRemaining;
        this.tournament.next( tournamentUpdate );
    }
}
