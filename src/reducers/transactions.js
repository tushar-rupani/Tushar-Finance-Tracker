import { createSlice } from "@reduxjs/toolkit";
import { records } from "../utils/constants/_const";
export const transactionSlice = createSlice({
    name: "transactions",
    initialState: {value: records},
    reducers: {
        addTransaction: (state, action) => {
            state.value.unshift(action.payload)
        },
        editTransaction: (state, action) => {
            state.value = action.payload;
        },
        deleteTransaction: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {addTransaction, editTransaction, deleteTransaction} = transactionSlice.actions;