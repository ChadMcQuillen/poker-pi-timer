import { createSlice } from '@reduxjs/toolkit';

export const tournamentSlice = createSlice({
  name: 'tournament',
  initialState: {
    tournament: {
      state: 'loading'
    }
  },
  reducers: {
    update( state, action ) {
      state.tournament = { ...state.tournament, ...action.payload };
    }
  }
});

export const {
  add,
  update
} = tournamentSlice.actions;

export const getTournament = state => state.entities.tournament.tournament;
