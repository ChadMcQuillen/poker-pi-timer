import React from 'react';
import styles from './css/tournament-blind-schedule.module.css';

function getFontSizeForBlinds( level ) {
    var numberOfDigits = level.smallBlind.toString().length +
                         level.bigBlind.toString().length;
    if (level.ante > 0) {
        numberOfDigits += level.ante.toString().length;
    }
    if (numberOfDigits < 8) {
        return styles.large;
    } else if (numberOfDigits < 12) {
        return styles.medium;
    } else {
        return styles.small;
    }
}

function mapBlindSchedule( levels, currentLevelIndex, startIndex, endIndex ) {
    return levels.slice(startIndex, endIndex + 1).map( function( level, i ) {
        var selection = (i === ( currentLevelIndex - startIndex )) ? styles.selected : styles.notSelected;
        var fontSize = getFontSizeForBlinds( level );
        if ( level.levelType === 'Level' ) {
            if ( level.ante === 0 ) {
                var blinds = '$' + level.smallBlind + ' / $' + level.bigBlind;
                return(
                    <React.Fragment key = { i }>
                      <tr><td className = { `${ styles.large } ${ selection }` }>Level { level.levelIndex }</td></tr>
                      <tr><td className = { `${ fontSize } ${ selection }` }>{ blinds }</td></tr>
                    </React.Fragment>
                );
            } else {
                var blindsAndAnte = '$' + level.smallBlind + ' / $' + level.bigBlind + ' / $' + level.ante;
                return(
                    <React.Fragment key = { i }>
                      <tr><td className = { `${ styles.large } ${ selection }` }>Level { level.levelIndex }</td></tr>
                      <tr><td className = { `${ fontSize } ${ selection }` }>{ blindsAndAnte }</td></tr>
                    </React.Fragment>
                );
            }
        } else {
            return(
                <React.Fragment key = { i }>
                  <tr><td className = { `${ styles.large } ${ selection }` }>Break { level.levelIndex }</td></tr>
                  <tr><td className = { `${ fontSize } ${ selection }` }>{ level.levelTime } minutes</td></tr>
                </React.Fragment>
            );
        }
    } );
}

export const TournamentBlindScheduleView = ( { levels, levelIndex } ) => {
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
          { mapBlindSchedule( levels, levelIndex, startBlindIndex, endBlindIndex ) }
        </tbody>
      </table>
    );
};
