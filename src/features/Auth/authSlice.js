import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "user",
    initialState: {
        isAuthenticated: false,
        _id: "",
        username: "",
        email: "",
        photo: [],
        profileTitle: "",
        bio: "",
        links: [],
    },
    reducers: {
        setUserData: (state, { payload }) => {
            return { ...state, ...payload };
        },
        setAuth: (state, { payload }) => {
            state.isAuthenticated = !!payload._id;
            state._id = payload._id;
        },
        setPhoto: (state, { payload }) => {
            state.photo = payload;
        },
        removePhoto: (state) => {
            state.photo = "";
        },
        updateLinks: (state, { payload }) => {
            return { ...state, links: payload };
        },
    },
});

export const { setUserData, setAuth, setPhoto, removePhoto, updateLinks } =
    authSlice.actions;
