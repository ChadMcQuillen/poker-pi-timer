import { BehaviorSubject } from 'rxjs';

export default class Tournament {
    constructor( timerTickService, tournamentControlService ) {
        this.timerTickService = timerTickService;
        this.tournamentControlService = tournamentControlService;
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
        update.secondsRemaining = this.activeTournament.secondsRemaining;
        this.tournament.next( update );
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
        } else if ( tournamentUpdate.hasOwnProperty( 'state' ) ) {
            // new tournament
            tournamentUpdate.secondsRemaining = tournamentUpdate.levelsAndBreaks[ 0 ].levelTime * 60;
            tournamentUpdate.payouts = [ 1.0 ];
            this.activeTournament = tournamentUpdate;
        }
        this.tournament.next( tournamentUpdate );
    }
}
