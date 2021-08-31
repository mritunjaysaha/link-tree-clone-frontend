import { createSlice } from "@reduxjs/toolkit";

export const appearanceSlice = createSlice({
    name: "modal",
    initialState: {
        pickModal: false,
        uploadModal: false,
        cropModal: false,
    },
    reducers: {
        pickModalReducer: (state) => {
            return { ...state, pickModal: !state.pickModal };
        },
        uploadModalReducer: (state) => {
            return { ...state, uploadModal: !state.uploadModal };
        },
        cropModalReducer: (state) => {
            return { ...state, cropModal: !state.cropModal };
        },
    },
});

export const { pickModalReducer, uploadModalReducer, cropModalReducer } =
    appearanceSlice.actions;
