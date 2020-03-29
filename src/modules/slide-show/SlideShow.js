import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import './css/slide-show.css';
import { getDisplayIndex,
         getImages } from 'state/entities/slideShowSlice';
import { getTournament } from 'state/entities/tournamentSlice';

const SlideShow = ( props ) => {

  let history = useHistory();

  const {
    displayIndex,
    images,
    tournament
  } = props;

  useEffect( () => {
    const checkForActiveTournament = () => {
      if ( tournament && tournament.id ) {
        history.push( '/tournaments/active/' + tournament.id );
      }
    }
    checkForActiveTournament();
  }, [ history, tournament ] );

  return (
    <div className = 'scaled-to-full-screen'>
      <img src = { images[ displayIndex ].image } alt = '' />
        <div className = 'image-caption-container'>
          <div className = 'photo-credit-text'>{ images[ displayIndex ].attribution }</div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  displayIndex: getDisplayIndex( state ),
  images: getImages( state ),
  tournament: getTournament( state )
});

export default connect(
  mapStateToProps
)( SlideShow );
