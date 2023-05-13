import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
    name: "users",
    initialState: {value: []},
    reducers: {
        addUser: (state, action) => {
            const stateToBeUpdated = [ action.payload, ...state.value];
            state.value = stateToBeUpdated;
        }
    }
})


export const {addUser} = userSlice.actions