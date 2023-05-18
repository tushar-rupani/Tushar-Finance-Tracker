import { createSlice } from "@reduxjs/toolkit";

interface UserType {
  email: string;
  password: string;
}

interface UserState {
  value: UserType[];
}

const initialState: UserState = { value: [] };
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const stateToBeUpdated = [action.payload, ...state.value];
      state.value = stateToBeUpdated;
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
