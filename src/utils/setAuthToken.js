import axios from "axios";

export const setAuthToken = (token) => {
    if (token) {
        // Apply authorization token to every request if logged in
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        // delete auth header
        delete axios.defaults.headers.common["Authorization"];
    }
};
