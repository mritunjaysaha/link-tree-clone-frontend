import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useState } from "react";
import axios from "axios";

import { InputField } from "../../components/Form/input";
import styles from "./login.module.scss";

export function LogIn() {
    const dispatch = useDispatch();
    const history = useHistory();

    // update backend routes to login with username
    const [user, setUser] = useState({
        email: "test@email.com",
        password: "123456",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:9000/api/login", user)
            .then((res) => {
                console.log(res.data);

                const { token, user } = res.data;
                const userData = {
                    user,
                    token,
                };
                dispatch(setCredentials(userData));

                // TODO Add programmatic routing to admin
                // history.push("/admin");
            })
            .catch((err) => console.log(err.message));
    };

    return (
        <section className={styles.loginSection}>
            <div className={styles.loginDiv}>
                <p>Sign in to your Linktree account</p>
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <InputField
                        type="text"
                        name="email"
                        onChange={handleChange}
                        label="email"
                        // value={user.email}
                    />
                    <InputField
                        type="text"
                        name="password"
                        onChange={handleChange}
                        label="password"
                        // value={user.password}
                    />
                    {/* <div>
                        <input
                            type="text"
                            name="email"
                            onChange={handleChange}
                            placeholder="email"
                            value={formState.email}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="password"
                            onChange={handleChange}
                            placeholder="password"
                            value={formState.password}
                        />
                    </div> */}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </section>
    );
}
