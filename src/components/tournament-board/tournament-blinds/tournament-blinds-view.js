import React from 'react';
import styles from './tournament-blinds.module.css';

class TournamentBlindsView extends React.Component {
    render() {
        var level = this.props.levels[ this.props.levelIndex ];
        var title = '';
        if ( level.levelType === 'Break' ) {
            title = 'Break';
        } else if ( level.ante === 0 ) {
            title = 'Blinds';
        } else {
            title = 'Blinds + Ante';
        }
        var info = '';
        if ( level.levelType === 'Level' ) {
            if ( level.ante === 0 ) {
                info = '$' + level.smallBlind + ' / $' + level.bigBlind;
            } else {
                info = '$' + level.smallBlind + ' / $' + level.bigBlind + ' / $' + level.ante;
            }
        }
        return (
          <div>
            <div className = { styles.title }>
              <div className = { styles.child }>{ title }</div>
            </div>
            <div className = { styles.text }>
              <div className = { styles.child }>{ info }</div>
            </div>
          </div>
        );
    }
}

export default TournamentBlindsView;
