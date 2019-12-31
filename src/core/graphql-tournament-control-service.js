import gql from 'graphql-tag';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsconfig from '../aws-exports';
import { TournamentControlService } from './tournament-control-service';
import { getTournament, getActiveTournament } from '../graphql/queries';
import { onUpdateActiveTournament } from '../graphql/subscriptions';

export default class GraphQLTournamentControlService extends TournamentControlService {

	constructor() {
	    super();
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
        } ).then( ( { data: { getActiveTournament } } ) => {
            this.activeTournament = getActiveTournament;
            this.client.query( {
                query: gql( getTournament ),
                variables: {
                    id: this.activeTournament.tournamentId
                }
            } ).then( ( { data: { getTournament } } ) => {
                this.activeTournament.tournamentInfo = getTournament;
                this.tournament.next( this.activeTournament );
            } );
        } );


        this.client.subscribe( { query: gql( onUpdateActiveTournament ),
            variables: {
                id: process.env.REACT_APP_TOURNAMENT_ID
            } } )
        .subscribe({
            next: ( tournamentInfo ) => {
                tournamentInfo.data.onUpdateActiveTournament.tournamentInfo = this.activeTournament.tournamentInfo;
                this.tournament.next( tournamentInfo.data.onUpdateActiveTournament );
            }
        });
	}
}
