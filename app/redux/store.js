import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import venueReducer from './venueSlice';
import bannerReducer from './bannerSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    venue: venueReducer,
    banner: bannerReducer,
  },
});

export default store;