import { createSlice } from "@reduxjs/toolkit";
import { records } from "../utils/constants/_const";
export const transactionSlice = createSlice({
    name: "transactions",
    initialState: {value: records},
    reducers: {
        addTransaction: (state, action) => {
            const stateToBeUpdated = [ action.payload, ...state.value];
            state.value = stateToBeUpdated

        },
        editTransaction: (state, action) => {
            let updatedObj = state.value.map((element) => element.id === action.payload.id ? action.payload.newObj : element);
            state.value = updatedObj
        },
        deleteTransaction: (state, action) => {
            let updatedObj = state.value.filter((element) => element.id !== action.payload);
            state.value = updatedObj;
        }
    }
})

export const {addTransaction, editTransaction, deleteTransaction} = transactionSlice.actions;