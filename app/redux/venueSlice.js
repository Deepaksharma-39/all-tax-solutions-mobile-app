// slices/venueSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  status: 'idle',
  error: null,
};

const venueSlice = createSlice({
  name: 'venue',
  initialState,
  reducers: {
    fetchVenueStart: (state) => {
      state.status = 'loading';
    },
    fetchVenueSuccess: (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    },
    fetchVenueFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { fetchVenueStart, fetchVenueSuccess, fetchVenueFailure } = venueSlice.actions;
export const selectVenue = (state) => state.venue;
export default venueSlice.reducer;
