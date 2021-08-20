import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "user",
    initialState: {
        isAuthenticated: false,
        username: "",
        _id: "",
        email: "",
        photo: [],
        profileTitle: "",
        bio: "",
    },
    reducers: {
        setUserData: (state, { payload }) => {
            const { email, _id, username, photo, profileTitle, bio } = payload;

            state.isAuthenticated = !!_id;
            state.username = username ? username : "";
            state._id = _id ? _id : "";
            state.email = email ? email : "";
            state.photo = photo.data.data ? photo.data.data : "";
            state.profileTitle = profileTitle ? profileTitle : "";
            state.bio = bio ? bio : "";
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
