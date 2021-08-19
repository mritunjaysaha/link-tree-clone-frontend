import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "user",
    initialState: { isAuthenticated: false, username: "", _id: "", email: "" },
    reducers: {
        setUserData: (state, { payload }) => {
            const { email, _id, username } = payload;

            state.username = username;
            state._id = _id;
            state.email = email;
            state.isAuthenticated = _id;
        },
        setAuth: (state, { payload }) => {
            state.isAuthenticated = !!payload._id;
            state._id = payload._id;
        },
    },
});

export const { setUserData, setAuth } = authSlice.actions;
