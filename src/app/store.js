import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../features/Auth/authSlice";
import { appearanceSlice } from "../features/Admin/appearance/appearanceSlice";

export const store = configureStore({
    reducer: {
        user: authSlice.reducer,
        modal: appearanceSlice.reducer,
    },
});
