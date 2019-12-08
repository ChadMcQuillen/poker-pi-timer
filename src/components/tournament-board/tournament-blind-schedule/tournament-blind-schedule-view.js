import React from 'react';
import styles from './tournament-blind-schedule.module.css';

function mapBlindSchedule( levels, startIndex, endIndex ) {
    return levels.slice(startIndex, endIndex + 1).map( function( level, i ) {
        if ( level.levelType === 'Level' ) {
            if ( level.ante === 0 ) {
                var blinds = '$' + level.smallBlind + ' / $' + level.bigBlind;
                return(
                    <React.Fragment key = { i }>
                      <tr><td className = { styles.text }>Level { level.levelIndex }</td></tr>
                      <tr><td className = { styles.text }>{ blinds }</td></tr>
                    </React.Fragment>
                );
            } else {
                var blindsAndAnte = '$' + level.smallBlind + ' / $' + level.bigBlind + ' / $' + level.ante;
                return(
                    <React.Fragment key = { i }>
                      <tr><td className = { styles.text }>Level { level.levelIndex }</td></tr>
                      <tr><td className = { styles.text }>{ blindsAndAnte }</td></tr>
                    </React.Fragment>
                );
            }
        } else {
            return(
                <React.Fragment key = { i }>
                  <tr><td className = { styles.text }>Break { level.levelIndex }</td></tr>
                  <tr><td className = { styles.text }>{ level.levelTime } minutes</td></tr>
                </React.Fragment>
            );
        }
    } );
}

class TournamentBlindScheduleView extends React.Component {
    render() {
        var levels = this.props.levels;
        var levelIndex = this.props.levelIndex;
        var startBlindIndex = Math.max( levelIndex - 2, 0 );
        var endBlindIndex = Math.min( levelIndex + 2, levels.length - 1 );
        var excess;
        if ( levelIndex - startBlindIndex < 2 ) {
            excess = 2 - ( levelIndex - startBlindIndex );
            endBlindIndex = Math.min( endBlindIndex + excess, levels.length - 1 );
        }
        if ( endBlindIndex - levelIndex < 2 ) {
            excess = 2 - ( endBlindIndex - levelIndex );
            startBlindIndex = Math.max( startBlindIndex - excess, 0 );
        }
        return (
          <table className = { styles.blindSchedule }>
            <tbody>
              { mapBlindSchedule( levels, startBlindIndex, endBlindIndex ) }
            </tbody>
          </table>
        );
    }
}

export default TournamentBlindScheduleView;
