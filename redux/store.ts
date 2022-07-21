import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./profileSlice";
import signSlice from "./signSlice";

const store = configureStore({
  reducer: {
    sign: signSlice,
    profile: profileSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
