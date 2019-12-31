import { BehaviorSubject } from 'rxjs';

export class TournamentControlService {

    constructor() {
        this.tournament = new BehaviorSubject( { } );
    }

    updateTournament() {
       throw new Error('Method must be implemented');
    }
}
