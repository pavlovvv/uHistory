import { configureStore } from '@reduxjs/toolkit';
import signSlice from './signSlice';

const store = configureStore({
  reducer: {
    sign: signSlice,
  },
});


export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;