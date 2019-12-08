import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TournamentBoardView from './components/tournament-board';
import * as serviceWorker from './serviceWorker';

var tournamentInfo = {
    title: 'Friday Night Poker',
    description: '$20 Buy-in (1 rebuy through level 5)',
    buyIn: 20,
    rebuyAmount: 20,
    rebuyThroughLevel: 5,
    levels: [
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
    ]
};

ReactDOM.render(<TournamentBoardView tournamentInfo = { tournamentInfo } />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
