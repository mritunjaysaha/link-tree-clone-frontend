import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { InputField } from "../../components/Form/input";
import styles from "./signup.module.scss";

export function SignUp() {
    const [user, setUser] = useState({
        email: "newuser@test.com",
        name: "newuser",
        password: "123456",
    });

    function handleChange(e) {
        const { name, value } = e.target;

        setUser((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        axios
            .post("http://localhost:9000/api/signup", user)
            .then((res) => {
                console.log("signup", res.data);
            })
            .catch((err) => console.log(err));

        // TODO: Add programmatic routing to login page
    }

    // TODO Update backend schema for username
    // TODO Add backend validation to check username

    return (
        <section className={styles.signupSection}>
            <div className={styles.signupDiv}>
                <h3>Create an account for free</h3>
                <p>Free forever. No payment needed.</p>
                <form onSubmit={handleSubmit}>
                    <InputField
                        id="email"
                        name="email"
                        type="email"
                        label="email"
                        // value={user.email}
                        onChange={handleChange}
                        className={styles.formInput}
                    />
                    <InputField
                        id="name"
                        name="name"
                        type="text"
                        label="username"
                        // value={user.name}
                        onChange={handleChange}
                        className={styles.formInput}
                    />
                    <InputField
                        id="password"
                        name="password"
                        type="password"
                        label="password"
                        // value={user.password}
                        onChange={handleChange}
                        className={styles.formInput}
                    />
                    <button type="submit" disabled className={styles.button}>
                        Sign up with email
                    </button>
                </form>
                <hr />
                <div className={styles.divLinkCreateOne}>
                    <Link to="/login">Already have an account?</Link>
                </div>
            </div>
        </section>
    );
}
