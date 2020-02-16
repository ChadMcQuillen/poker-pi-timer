import React from 'react';
import styles from './css/tournament-blinds.module.css';

function getFontSizeForBlinds( level ) {
    var klass = styles.large;
    if ( level.levelType === 'Level' ) {
        var numberOfDigits = level.smallBlind.toString().length +
                             level.bigBlind.toString().length;
        if (level.ante > 0) {
            numberOfDigits += level.ante.toString().length;
        }
        if ( numberOfDigits > 12 ) {
            klass = styles.small;
        }
    }
    return klass;
}

export const TournamentBlindsView = ( { levels, levelIndex } ) => {
    var level = levels[ levelIndex ];
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
    var klass = `${ styles.text } ${ getFontSizeForBlinds( level ) }`;
    return (
      <React.Fragment>
        <div className = { styles.title }>
          <div className = { styles.child }>{ title }</div>
        </div>
        <div className = { klass }>
          <div className = { styles.child }>{ info }</div>
        </div>
      </React.Fragment>
    );
};
