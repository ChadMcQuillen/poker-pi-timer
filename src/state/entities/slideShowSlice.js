import { createSlice } from '@reduxjs/toolkit';

export const slideShowSlice = createSlice({
  name: 'slideShow',
  initialState: {
    images: [
      {
        image: require( 'assets/images/las-vegas.jpg' ),
        attribution: 'By Lasvegaslover (Own work) [CC BY 3.0 (http://creativecommons.org/licenses/by/3.0)], via Wikimedia Commons'
      },
      {
        image: require( 'assets/images/bellagio.jpg' ),
        attribution: 'By Photographersnature (Own work) [CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0)], via Wikimedia Commons'
      },
      {
        image: require( 'assets/images/new-york-new-york.jpg' ),
        attribution: 'By World Wide Gifts (Flickr: USA - Nevada - Las Vegas - Strip) [CC BY-SA 2.0 (http://creativecommons.org/licenses/by-sa/2.0)], via Wikimedia Commons'
      },
      {
        image: require( 'assets/images/phil-hellmuth.jpg' ),
        attribution: 'By Photo by flipchip / LasVegasVegas.com [CC BY-SA 2.0 (http://creativecommons.org/licenses/by-sa/2.0)], via Wikimedia Commons'
      }
    ],
    displayIndex: 0
  },
  reducers: {
    updateDisplayIndex( state, action ) {
      state.displayIndex = action.payload.displayIndex;
    }
  }
});

export const {
  updateDisplayIndex
} = slideShowSlice.actions;

export const getImages = state => state.entities.slideShow.images;
export const getDisplayIndex = state => state.entities.slideShow.displayIndex;
