import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../features/Auth/authSlice";

export const store = configureStore({
    reducer: {
        user: authSlice.reducer,
    },
});
