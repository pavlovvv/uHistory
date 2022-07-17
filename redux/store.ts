import { configureStore } from '@reduxjs/toolkit';
import signSlice from './signSlice';
import profileSlice from './profileSlice'

const store = configureStore({
  reducer: {
    sign: signSlice,
    profile: profileSlice
  },
});


export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;