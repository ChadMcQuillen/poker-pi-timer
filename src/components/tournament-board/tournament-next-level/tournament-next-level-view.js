import React from 'react';
import styles from './tournament-next-level.module.css';

class TournamentNextLevelView extends React.Component {
    render() {
        var info = '';
        if ( this.props.levelIndex < this.props.levels.length - 1 ) {
            var level = this.props.levels[ this.props.levelIndex + 1 ];
            if ( level.levelType === 'Break' ) {
                info = 'Break ' + level.levelIndex;
            } else {
                if ( level.ante === 0 ) {
                    info = 'Next Level:  $' + level.smallBlind + ' / $' + level.bigBlind;
                } else {
                    info = 'Next Level:  $' + level.smallBlind + ' / $' + level.bigBlind + ' / $' + level.ante;
                }
            }
        }
        return (
          <div className = { styles.text }>
            <div className = { styles.child }>{ info }</div>
          </div>
        );
    }
}

export default TournamentNextLevelView;
