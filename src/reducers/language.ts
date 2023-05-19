import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import hi from "../locale/hi.locale.json";
import en from "../locale/en.locale.json";

type ObjType = {
  value: {
    [key: string]: string;
  };
};
const initialState: ObjType = { value: hi };

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<string>) => {
      if (action.payload === "hi") {
        state.value = hi;
      } else {
        state.value = en;
      }
    },
  },
});

export default languageSlice.reducer;
export const { changeLanguage } = languageSlice.actions;
