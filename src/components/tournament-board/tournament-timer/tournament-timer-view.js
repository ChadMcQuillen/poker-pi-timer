import React from 'react';
import Sound from 'react-sound';
import styles from './tournament-timer.module.css';
import soundfile from '../../../assets/audio/beep.wav';

function formatTime( value, showHours ) {
    var seconds = value % 60;
    value = Math.trunc( value / 60 );
    var minutes = value % 60;
    value = Math.trunc( value / 60 );
    var hours = value % 24;

    var timerText = ( showHours ? ( hours + ':' ) : '' ) +
                    ( minutes < 10 ? '0' : '' ) + minutes +
                    ':' +
                    ( seconds < 10 ? '0' : '' ) + seconds;
    return timerText;
}

const TournamentTimerView = ( { secondsRemaining, showHours } ) => {
    var sound;
    if ( secondsRemaining <= 5 ) {
        sound = <Sound url = { soundfile } playStatus = { Sound.status.PLAYING } />
    }
    return(
      <div className = { styles.text }>
        <div className = { `${ secondsRemaining > 5 ? styles.child : styles.childRed }` }>
          { formatTime( secondsRemaining, showHours ) }
        </div>
        { sound }
      </div>
    );
}
export default TournamentTimerView;
