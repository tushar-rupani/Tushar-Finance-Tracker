import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { transactionSlice } from './reducers/transactions';
import storage from "redux-persist/lib/storage"
import persistReducer from 'redux-persist/es/persistReducer';
import { combineReducers } from '@reduxjs/toolkit';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const reducer = combineReducers({
    transactions: transactionSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, reducer)
const store = configureStore({
    reducer: {
        persistedReducer
    }
})

let persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);
