import { configureStore } from "@reduxjs/toolkit";
import { persisted } from "./reducers/index";
export const store = configureStore({
  reducer: persisted,
});

export type RootState = ReturnType<typeof store.getState>;
