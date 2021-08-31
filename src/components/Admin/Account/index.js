import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { MUITextFieldBorderBottom } from "../../Form/input";
import styles from "./account.module.scss";

export function Account() {
    const { email, name, _id: userId } = useSelector((state) => state.user);

    const [userDetails, setUserDetails] = useState({
        name: name ? name : "",
        email: email ? email : "",
    });
    // const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        setUserDetails((prev) => ({ ...prev, email, name }));
    }, [email, name]);

    function handleChange(e) {
        const { name, value } = e.target;

        setUserDetails((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        console.log("clicked");

        await axios
            .put(`/api/user/${userId}`, userDetails)
            .then((res) => console.log("user updated", res.data))
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
                    <button data-text="delete account">Delete account</button>
                </div>
            </article>
        </section>
    );
}
