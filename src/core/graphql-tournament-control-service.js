import gql from 'graphql-tag';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsconfig from '../aws-exports';
import { TournamentControlService } from './tournament-control-service';
import { getTournament, getActiveTournament } from '../graphql/queries';
import { onUpdateActiveTournament } from '../graphql/subscriptions';

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
            variables: {
                id: process.env.REACT_APP_TOURNAMENT_ID
            }
        } ).then( ( { data: { getActiveTournament: {
            tournamentId,
            currentLevelIndex,
            numberOfEntrants,
            numberOfPlayersRemaining,
            numberOfRebuys,
            state } } } ) => {
            var update = {
                currentLevelIndex: currentLevelIndex,
                numberOfEntrants: numberOfEntrants,
                numberOfPlayersRemaining: numberOfPlayersRemaining,
                numberOfRebuys: numberOfRebuys,
                state: state
            };
            this.activeTournament = { ...this.activeTournament, ...update };
            this.client.query( {
                query: gql( getTournament ),
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
            next: ( { data: { onUpdateActiveTournament: {
                currentLevelIndex,
                numberOfEntrants,
                numberOfPlayersRemaining,
                numberOfRebuys,
                state } } } ) => {
                var update = {
                    currentLevelIndex: currentLevelIndex,
                    numberOfEntrants: numberOfEntrants,
                    numberOfPlayersRemaining: numberOfPlayersRemaining,
                    numberOfRebuys: numberOfRebuys,
                    state: state
                };
                this.activeTournament = { ...this.activeTournament, ...update };
                this.tournament.next( update );
            }
        } );
	}
}
