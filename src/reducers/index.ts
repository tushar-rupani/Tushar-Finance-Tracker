import { combineReducers } from "@reduxjs/toolkit";
import transactions from "./transactions";
import users from "./users";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import language from "./language";
export const rootReducers = combineReducers({
  transactions,
  users,
  language,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

export const persisted = persistReducer(persistConfig, rootReducers);
