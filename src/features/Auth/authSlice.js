import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "user",
    initialState: { isAuthenticated: false, user: null, token: null },
    reducers: {
        setCredentials: (state, userData) => {
            const { token, user } = userData.payload;

            state.token = token;
            state.user = user;
            state.isAuthenticated = !!token;

            console.log(state);
        },
    },
});

export const { setCredentials } = authSlice.actions;

export const selectCurrentUser = (state) => state.user;

export const getIsAuthenticated = (state) => state.user.isAuthenticated;
