import { configureStore } from "@reduxjs/toolkit";
import allReducers from "./reducers/index";

export const store = configureStore({
  reducer: allReducers,
});

export type RootState = ReturnType<typeof store.getState>;
