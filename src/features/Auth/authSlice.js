import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, token: null },
    reducers: {
        setCredentials: (state, userData) => {
            const { token, user } = userData.payload;

            state.token = token;
            state.user = user;
        },
    },
});

export const { setCredentials } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
