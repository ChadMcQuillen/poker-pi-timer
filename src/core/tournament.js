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

    processTournamentUpdate( tournamentUpdate ) {
        if ( this.tournament.value.hasOwnProperty( 'state' ) ) {
            // check if different
        } else if ( tournamentUpdate.hasOwnProperty( 'state' ) ) {
            // new tournament
            tournamentUpdate.secondsRemaining = tournamentUpdate.tournamentInfo.levelsAndBreaks[ 0 ].levelTime * 60;
            tournamentUpdate.payouts = [ 1.0 ];
            this.tournament.next( tournamentUpdate );
        }
    }
}
