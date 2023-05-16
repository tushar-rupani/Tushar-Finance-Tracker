import { createSlice } from "@reduxjs/toolkit";
import { FormType } from "../pages/models/FormTypes/Form";
import type { PayloadAction } from "@reduxjs/toolkit";
interface TransactionState {
  value: FormType[];
}

const initialState: TransactionState = { value: [] };
const transactionSlice = createSlice({
  name: "Transactions",
  initialState,
  reducers: {
    addTransactions: (state, action: PayloadAction<FormType>) => {
      const stateToBeUpdated: FormType[] = [action.payload, ...state.value];
      state.value = stateToBeUpdated;
      alert("Value added");
    },
  },
});

export const { addTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;
