import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useState } from "react";
import axios from "axios";

export function LogIn() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [formState, setFormState] = useState({
        email: "test@email.com",
        password: "123456",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("/api/login", formState)
            .then((res) => {
                console.log(res.data);

                const { token, user } = res.data;
                const userData = {
                    user,
                    token,
                };
                dispatch(setCredentials(userData));

                // TODO Add programmatic routing
            })
            .catch((err) => console.log(err.message));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    placeholder="email"
                    value={formState.email}
                />

                <input
                    type="text"
                    name="password"
                    onChange={handleChange}
                    placeholder="password"
                    value={formState.password}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
