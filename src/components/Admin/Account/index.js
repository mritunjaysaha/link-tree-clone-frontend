import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { MUITextFieldBorderBottom } from "../../Form/input";
import styles from "./account.module.scss";

import { urls } from "../../../data/data";

export function Account() {
    const history = useHistory();
    const user = useSelector((state) => state.user.data);
    const { _id: userId } = useSelector((state) => state.user);
    console.log("accounts", user);

    const [userDetails, setUserDetails] = useState({
        name: !!user.name ? user.name : "",
        email: !!user.email ? !!user.email : "",
    });

    useEffect(() => {
        setUserDetails((prev) => ({
            ...prev,
            email: user.email,
            name: user.name,
        }));
    }, [user]);

    function handleChange(e) {
        const { name, value } = e.target;

        setUserDetails((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        await axios
            .put(`/api/user/${userId}`, userDetails)
            .then((res) => console.log("user updated"))
            .catch((err) => console.log(err.message));
    }

    async function handleDeleteAccount() {
        await axios
            .delete(`/api/user/${userId}`)
            .then((res) => {
                console.log("user successfully deleted", res.data);
                localStorage.removeItem("jwtToken");
                history.push(urls.login);
            })
            .catch((err) => console.log(err.message));
    }

    return (
        <section className={styles.accountsContainer}>
            <p className={styles.myAccountP}>My account</p>

            <form noValidate onSubmit={handleSubmit}>
                <p>My Information</p>
                <div className={styles.divWrapper}>
                    <div className={styles.inputDiv}>
                        <MUITextFieldBorderBottom
                            fullWidth
                            variant="filled"
                            type="text"
                            name="name"
                            label="Name"
                            value={userDetails.name}
                            onChange={handleChange}
                        />
                    </div>
                    <MUITextFieldBorderBottom
                        fullWidth
                        variant="filled"
                        name="email"
                        label="email"
                        type="email"
                        value={userDetails.email}
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    data-text="save details"
                    // disabled={isDisabled}
                >
                    Save details
                </button>
            </form>

            <article>
                <p>Danger Zone</p>
                <div className={styles.divWrapper}>
                    <button
                        data-text="delete account"
                        onClick={handleDeleteAccount}
                    >
                        Delete account
                    </button>
                </div>
            </article>
        </section>
    );
}
