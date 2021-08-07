import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useState } from "react";
import axios from "axios";

import { InputField } from "../../components/Form/input";
import styles from "./login.module.scss";

import { urls } from "../../data/data";

export function LogIn() {
    const dispatch = useDispatch();
    const history = useHistory();

    // update backend routes to login with username
    const [user, setUser] = useState({
        username: "",
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
                        name="username"
                        label="username"
                        value={user.username}
                        onChange={handleChange}
                        className={styles.formInput}
                    />
                    <InputField
                        type="password"
                        name="password"
                        label="password"
                        value={user.password}
                        onChange={handleChange}
                        className={styles.formInput}
                    />

                    <button type="submit" disabled className={styles.button}>
                        Sign in
                    </button>
                </form>
                <div className={styles.divLinkPassword}>
                    <Link to="/">Forgot password?</Link>
                </div>
                <div className={styles.divLinkCreateOne}>
                    Don't have an account?&nbsp;
                    <Link to={urls.signup}>Create one</Link>
                </div>
            </div>
        </section>
    );
}
