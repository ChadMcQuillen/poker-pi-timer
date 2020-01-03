import gql from 'graphql-tag';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsconfig from '../aws-exports';
import { TournamentControlService } from './tournament-control-service';
import { getTournament, getActiveTournament } from '../graphql/queries';
import { updateActiveTournament } from '../graphql/mutations';
import { onUpdateActiveTournament } from '../graphql/subscriptions';

function buildPayouts( {
    payout1, payout2, payout3, payout4, payout5, payout6, payout7, payout8, payout9 } ) {
    var payouts = [
        payout1,
        payout2,
        payout3,
        payout4,
        payout5,
        payout6,
        payout7,
        payout8,
        payout9
    ];
    payouts = payouts.filter( value => {
        return value > 0;
    } );
    if ( payouts.reduce( ( a, b ) => a + b, 0 ) !== 100 ) {
        payouts = [ 100 ];
    }
    return payouts;
}

export default class GraphQLTournamentControlService extends TournamentControlService {

	constructor() {
	    super();

	    this.activeTournament = { };

        this.client = new AWSAppSyncClient( {
            url: awsconfig.aws_appsync_graphqlEndpoint,
            region: awsconfig.aws_appsync_region,
            auth: {
                type: AUTH_TYPE.API_KEY,
                apiKey: awsconfig.aws_appsync_apiKey,
            }
        } );

        this.client.query( {
            query: gql( getActiveTournament ),
            fetchPolicy: 'network-only',
            variables: {
                id: process.env.REACT_APP_TOURNAMENT_ID
            }
        } ).then( ( {
            data: {
                getActiveTournament: {
                    id,
                    tournamentId,
                    currentLevelIndex,
                    numberOfEntrants,
                    numberOfPlayersRemaining,
                    numberOfRebuys,
                    state
                }
            },
            data: {
                getActiveTournament
            }
        } ) => {
            var payouts = buildPayouts( getActiveTournament );
            var update = {
                currentLevelIndex: currentLevelIndex,
                numberOfEntrants: numberOfEntrants,
                numberOfPlayersRemaining: numberOfPlayersRemaining,
                numberOfRebuys: numberOfRebuys,
                payouts: payouts,
                state: state
            };
            this.activeTournamentId = id;
            this.activeTournament = { ...this.activeTournament, ...update };
            this.client.query( {
                query: gql( getTournament ),
                fetchPolicy: 'network-only',
                variables: {
                    id: tournamentId
                }
            } ).then( ( { data: { getTournament: {
                title,
                description,
                buyIn,
                rebuyAmount,
                rebuyThroughLevel,
                levelsAndBreaks } } } ) => {
                update = {
                    title: title,
                    description: description,
                    buyIn: buyIn,
                    rebuyAmount: rebuyAmount,
                    rebuyThroughlevel: rebuyThroughLevel,
                    levelsAndBreaks: levelsAndBreaks
                };
                this.activeTournament = { ...this.activeTournament, ...update }
                this.tournament.next( this.activeTournament );
            } );
        } );


        this.client.subscribe( { query: gql( onUpdateActiveTournament ),
            variables: {
                id: process.env.REACT_APP_TOURNAMENT_ID
            } } )
        .subscribe( {
            next: ( {
                data: {
                    onUpdateActiveTournament: {
                        currentLevelIndex,
                        numberOfEntrants,
                        numberOfPlayersRemaining,
                        numberOfRebuys,
                        state
                    }
                },
                data: {
                    onUpdateActiveTournament
                }
            } ) => {
                var payouts = buildPayouts( onUpdateActiveTournament );
                var update = {
                    currentLevelIndex: currentLevelIndex,
                    numberOfEntrants: numberOfEntrants,
                    numberOfPlayersRemaining: numberOfPlayersRemaining,
                    numberOfRebuys: numberOfRebuys,
                    payouts: payouts,
                    state: state
                };
                this.activeTournament = { ...this.activeTournament, ...update };
                this.tournament.next( update );
            }
        } );
	}

    updateTournament( tournamentUpdate ) {
        var variables = { };
        variables.input = { ...tournamentUpdate };
        variables.input.id = this.activeTournamentId;
        this.client.mutate( {
            mutation: gql( updateActiveTournament ),
            variables: variables
        } )
            .then( result => {
                console.log( 'results of mutation: ', result );
            })
            .catch( console.error );
    }
}
