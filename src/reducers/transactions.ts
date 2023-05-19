import { createSlice } from "@reduxjs/toolkit";
import { FormType } from "../pages/models/FormTypes/Form";
import type { PayloadAction } from "@reduxjs/toolkit";
interface TransactionState {
  value: FormType[];
}
interface EditTransactionState {
  new_id: number;
  newObject: FormType;
}

const initialState: TransactionState = { value: [] };

const transactionSlice = createSlice({
  name: "Transactions",
  initialState,
  reducers: {
    addTransactions: (state, action: PayloadAction<FormType>) => {
      const stateToBeUpdated: FormType[] = [action.payload, ...state.value];
      state.value = stateToBeUpdated;
    },
    editTransaction: (state, action: PayloadAction<EditTransactionState>) => {
      let updatedObj = state.value.map((element) =>
        element.id === action.payload.new_id
          ? action.payload.newObject
          : element
      );
      state.value = updatedObj;
    },
    deleteTransaction: (state, action: PayloadAction<number>) => {
      let updatedObj = state.value.filter(
        (element) => element.id !== action.payload
      );
      state.value = updatedObj;
    },
  },
});

export const { addTransactions, editTransaction, deleteTransaction } =
  transactionSlice.actions;
export default transactionSlice.reducer;
