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
            console.log({ payload });

            const { email, _id, username, photo, profileTitle, bio, links } =
                payload;

            state.isAuthenticated = !!_id;
            state.username = username ? username : "";
            state._id = _id ? _id : "";
            state.email = email ? email : "";
            state.photo = photo.data.data ? photo.data.data : "";
            state.profileTitle = profileTitle ? profileTitle : "";
            state.bio = bio ? bio : "";
            state.links = links ? links : [];
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
