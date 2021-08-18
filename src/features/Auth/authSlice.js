import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "user",
    initialState: { isAuthenticated: false, user: null, token: null },
    reducers: {
        setAuth: (state, payload) => {
            const auth = Boolean(payload);
            return { ...state, isAuthenticated: auth, user: payload };
        },
    },
});

export const { setAuth } = authSlice.actions;
