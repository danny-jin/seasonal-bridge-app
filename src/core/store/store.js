import { configureStore } from '@reduxjs/toolkit';
import bridgeReducer from './slice/bridgeSlice';

export const store = configureStore({
  reducer: {
    counter: bridgeReducer,
  },
});
