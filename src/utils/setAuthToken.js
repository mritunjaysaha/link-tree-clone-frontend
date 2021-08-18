import axios from "axios";

export const setAuthToken = (token) => {
    if (token) {
        // Apply authorization token to every request if logged in
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        console.log("axios", axios.defaults.headers.common);
    } else {
        // delete auth header
        delete axios.defaults.headers.common["Authorization"];
    }
};
