import { combineReducers } from "@reduxjs/toolkit";
import transactions from "./transactions";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

export const rootReducers = combineReducers({
  transactions,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

export const persisted = persistReducer(persistConfig, rootReducers);
