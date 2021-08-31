import { MUITextFieldBorderBottom } from "../../Form/input";
import styles from "./account.module.scss";

export function Account() {
    return (
        <section className={styles.accountsContainer}>
            <p className={styles.myAccountP}>My account</p>

            <article>
                <p>My Information</p>
                <div className={styles.inputContainer}>
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
                    <MUITextFieldBorderBottom
                        fullWidth
                        variant="filled"
                        name="email"
                        label="email"
                        type="email"
                        // value="asjdkla"
                    />
                </div>

                <button data-save-btn>Save details</button>
            </article>

            <article>
                <p>Danger Zone</p>
                <div>
                    <button data-delete-btn>Delete Account</button>
                </div>
            </article>
        </section>
    );
}
