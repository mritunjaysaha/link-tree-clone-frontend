import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { InputField } from "../../components/Form/input";
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
    const [isDisabled, setIsDisabled] = useState(true);

    const formik = useFormik({
        initialValues: {
            email: "",
            name: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: () => {
            const user = {
                email: formik.values.email,
                name: formik.values.username,
                password: formik.values.password,
            };

            axios
                .post("http://localhost:9000/api/signup", user)
                .then((res) => {
                    console.log("signup", res.data);
                })
                .catch((err) => console.log(err));

            // TODO: Add programmatic routing to login page
        },
    });

    // TODO Update backend schema for username
    // TODO Add backend validation to check username
    // TODO Handle disabled

    useEffect(() => {
        if (
            !!formik.values.email &&
            !!formik.values.name &&
            formik.values.password.length >= 6
        ) {
            setIsDisabled(false);
        }
    }, [formik]);

    return (
        <section className={styles.signupSection}>
            <div className={styles.signupDiv}>
                <h3 className={styles.signupH3}>Create an account for free</h3>
                <p className={styles.signupP}>
                    Free forever. No payment needed.
                </p>
                <form onSubmit={formik.handleSubmit} noValidate>
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
                        name="name"
                        type="text"
                        label="username"
                        value={formik.values.name}
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
                        className={styles.button}
                        disabled={isDisabled}
                    >
                        Sign up with email
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
