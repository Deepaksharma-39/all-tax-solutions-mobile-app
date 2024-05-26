// slices/bannerSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Import your fetch function if you have it in a separate file
// import { fetchBanners } from './api'; 

const initialState = {
  data: null,
  status: 'idle',
  error: null,
};

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    fetchBannersStart: (state) => {
      state.status = 'loading';
    },
    fetchBannersSuccess: (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    },
    fetchBannersFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { fetchBannersStart, fetchBannersSuccess, fetchBannersFailure } = bannerSlice.actions;

// Asynchronous thunk action to fetch banners
export const fetchBanners = () => async (dispatch) => {
  dispatch(fetchBannersStart());
  try {
    const response = await fetch('https://api.allroadtaxsolutions.com/banners');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    dispatch(fetchBannersSuccess(data));
  } catch (error) {
    dispatch(fetchBannersFailure(error.message));
  }
};

export const selectBanner = (state) => state.banner;
export default bannerSlice.reducer;
