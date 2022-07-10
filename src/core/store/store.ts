import { configureStore } from '@reduxjs/toolkit';
import bridgeReducer from './slice/bridgeSlice';

const store = configureStore({
  reducer: {
    app: bridgeReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});
export type RootState = ReturnType<typeof store.getState>;
export default store;