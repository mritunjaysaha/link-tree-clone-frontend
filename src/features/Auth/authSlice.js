import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "user",
    initialState: {
        isAuthenticated: false,
        username: "",
        _id: "",
        email: "",
        photo: [],
    },
    reducers: {
        setUserData: (state, { payload }) => {
            const { email, _id, username, photo } = payload;

            state.isAuthenticated = !!_id;
            state.username = username;
            state._id = _id;
            state.email = email;
            state.photo = photo.data.data;
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
    },
});

export const { setUserData, setAuth, setPhoto, removePhoto } =
    authSlice.actions;
