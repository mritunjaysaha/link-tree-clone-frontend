import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "user",
    initialState: { isAuthenticated: false, userID: null },
    reducers: {
        setAuth: (state, user) => {
            console.log({ user });
            console.log(user.payload._id);
            state.isAuthenticated = Boolean(user.payload._id);
            state.userID = user.payload._id;
        },
    },
});

export const { setAuth } = authSlice.actions;
