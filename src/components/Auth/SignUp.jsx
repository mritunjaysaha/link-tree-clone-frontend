import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { InputField } from "../../components/Form/input";
import { urls } from "../../data/data";
import { LoadingSpinner } from "../Loader";
import { useLoader } from "../../customHooks/loadingHook";

import styles from "./signup.module.scss";

const validationSchema = yup.object({
    email: yup
        .string("Enter your email")
        .email("Please enter a valid email address")
        .required("Email is required"),
    name: yup
        .string("Username")
        .min(3, "Usernames must be longer than 3 characters")
        .required("Username is required"),
    password: yup
        .string("Enter your password")
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

export function SignUp() {
    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            email: "",
            username: "",
            password: "",
        },
        validationSchema: validationSchema,
    });

    const [isLoading, startLoader, stopLoader] = useLoader();

    function handleSubmit(e) {
        e.preventDefault();

        startLoader();
        localStorage.removeItem("jwtToken");

        axios.defaults.authorization = "";
        console.log(axios.defaults);

        const user = {
            email: formik.values.email,
            username: formik.values.username,
            password: formik.values.password,
        };

        axios
            .post("/api/signup", user)
            .then((res) => {
                stopLoader();
                history.push(urls.login);
            })
            .catch((err) => {
                startLoader();

                console.log(err);
            });
    }

    return (
        <section className={styles.signupSection}>
            <div className={styles.signupDiv}>
                <h3 className={styles.signupH3}>Create an account for free</h3>
                <p className={styles.signupP}>
                    Free forever. No payment needed.
                </p>
                <form onSubmit={handleSubmit} noValidate>
                    <InputField
                        name="email"
                        type="email"
                        label="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        className={styles.formInput}
                        error={
                            formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <InputField
                        name="username"
                        type="text"
                        label="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        className={styles.formInput}
                        error={
                            formik.touched.name && Boolean(formik.errors.name)
                        }
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <InputField
                        name="password"
                        type="password"
                        label="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        className={styles.formInput}
                        error={
                            formik.touched.password &&
                            Boolean(formik.errors.password)
                        }
                        helperText={
                            formik.touched.password && formik.errors.password
                        }
                    />
                    <button
                        type="submit"
                        className={`${styles.button} ${styles.loaderContainer}`}
                        disabled={
                            !formik.values.email ||
                            !formik.values.username ||
                            !formik.values.password
                        }
                    >
                        {isLoading ? <LoadingSpinner /> : "Sign up with email"}
                    </button>
                </form>
                <hr />
                <div className={styles.divLink}>
                    <Link to="/login">Already have an account?</Link>
                </div>
            </div>
        </section>
    );
}
