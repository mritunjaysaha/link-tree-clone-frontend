import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { InputField } from "../../components/Form/input";
import { urls } from "../../data/data";
import { LoadingSpinner } from "../Loader";
import { setAuth } from "../../features/Auth/authSlice";
import { useLoader } from "../../customHooks/loadingHook";

import styles from "./login.module.scss";

export function LogIn() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const [isLoading, startLoader, stopLoader] = useLoader();
    const [error, setError] = useState({ message: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = { username: user.username, password: user.password };
        startLoader();

        axios
            .post("/api/login", userData)
            .then((res) => {
                const { user, token } = res.data;

                dispatch(setAuth(user));
                localStorage.setItem("jwtToken", token);
                history.push(urls.admin);

                stopLoader();
            })
            .catch((err) => {
                setError("Incorrect login details. Please retry.");
                console.log(err.message);
                stopLoader();
            });
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

                    <button
                        type="submit"
                        disabled={!user.username || !user.password}
                        className={`${styles.button} ${styles.loaderContainer}`}
                    >
                        {isLoading ? <LoadingSpinner /> : "Sign in"}
                    </button>
                    {!error ? <p>{error}</p> : ""}
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
