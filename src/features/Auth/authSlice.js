import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "user",
    initialState: { isAuthenticated: false, user: null, token: null },
    reducers: {
        setCredentials: (state, userData) => {
            const { token, user } = userData.payload;

            state.token = token;
            state.user = user;
            state.isAuthenticated = !!token;

            console.log("authSlice", userData);
        },
        setIsAuthenticated: (state, payload) => {
            const auth = Boolean(payload);
            return { ...state, isAuthenticated: auth, user: payload };
        },
    },
});

export const { setCredentials, setIsAuthenticated } = authSlice.actions;

export const selectCurrentUser = (state) => state.user;

export const getIsAuthenticated = (state) => state.user.isAuthenticated;
