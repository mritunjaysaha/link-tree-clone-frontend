import { MUITextFieldBorderBottom } from "../../Form/input";
import styles from "./account.module.scss";

export function Account() {
    return (
        <section className={styles.accountsContainer}>
            <p className={styles.myAccountP}>My account</p>

            <article>
                <p>My Information</p>
                <div className={styles.divWrapper}>
                    <div className={styles.inputDiv}>
                        <MUITextFieldBorderBottom
                            fullWidth
                            variant="filled"
                            type="text"
                            name="name"
                            label="Profile Title"
                            // value={profileTitle}
                            // onChange={handleProfileTitle}
                            // onBlur={handleSubmit}
                        />
                    </div>
                    <MUITextFieldBorderBottom
                        fullWidth
                        variant="filled"
                        name="email"
                        label="email"
                        type="email"
                        // value="asjdkla"
                    />
                </div>

                <button disabled data-text="save details">
                    Save details
                </button>
            </article>

            <article>
                <p>Danger Zone</p>
                <div className={styles.divWrapper}>
                    <button data-text="delete account">Delete account</button>
                </div>
            </article>
        </section>
    );
}
