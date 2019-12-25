import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TournamentBoardView from './components/tournament-board';
import * as serviceWorker from './serviceWorker';
import gql from 'graphql-tag';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsconfig from './aws-exports';
import { getTournament } from './graphql/queries';

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

const levels = [
    { level: 1,  levelTime: 20, smallBlind: 5,   bigBlind: 10,  ante: 0, breakTime: 0  },
    { level: 2,  levelTime: 20, smallBlind: 10,  bigBlind: 20,  ante: 0, breakTime: 0  },
    { level: 3,  levelTime: 20, smallBlind: 15,  bigBlind: 30,  ante: 0, breakTime: 0  },
    { level: 4,  levelTime: 20, smallBlind: 20,  bigBlind: 40,  ante: 0, breakTime: 0  },
    { level: 5,  levelTime: 20, smallBlind: 25,  bigBlind: 50,  ante: 0, breakTime: 20 },
    { level: 6,  levelTime: 20, smallBlind: 50,  bigBlind: 100, ante: 0, breakTime: 0  },
    { level: 7,  levelTime: 20, smallBlind: 75,  bigBlind: 150, ante: 0, breakTime: 0  },
    { level: 8,  levelTime: 20, smallBlind: 100, bigBlind: 200, ante: 0, breakTime: 0  },
    { level: 9,  levelTime: 20, smallBlind: 150, bigBlind: 300, ante: 0, breakTime: 0  },
    { level: 10, levelTime: 20, smallBlind: 200, bigBlind: 400, ante: 0, breakTime: 0  },
    { level: 11, levelTime: 20, smallBlind: 300, bigBlind: 600, ante: 0, breakTime: 0  }
];

const client = new AWSAppSyncClient( {
    url: awsconfig.aws_appsync_graphqlEndpoint,
    region: awsconfig.aws_appsync_region,
    auth: {
        type: AUTH_TYPE.API_KEY,
        apiKey: awsconfig.aws_appsync_apiKey,
    }
} );

client.query( {
    query: gql( getTournament ),
    variables: {
        id: process.env.REACT_APP_TOURNAMENT_ID
    }
} ).then( ( { data: { getTournament } } ) => {
    getTournament.levelsAndBreaks = constructLevelsAndBreaks( levels );
    ReactDOM.render(<TournamentBoardView tournamentInfo = { getTournament } />, document.getElementById('root'));
} );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
