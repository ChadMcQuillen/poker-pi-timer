import React from 'react';
import styles from './tournament-title-view.module.css';

class TournamentTitleView extends React.Component {
    render() {
        const title = this.props.title;
        const description = this.props.description;
        return (
          <div>
            <div className = { styles.title }>
              <div className= { styles.child }>{ title }</div>
            </div>
            <div className = { styles.description }>
              <div className= { styles.child }>{ description }</div>
            </div>
          </div>
        );
    }
}

export default TournamentTitleView;
