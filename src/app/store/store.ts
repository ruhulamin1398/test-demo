import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import competitionReducer from "./slices/competitionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    competition: competitionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
