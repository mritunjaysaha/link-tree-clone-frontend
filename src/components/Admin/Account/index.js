import { MUITextFieldBorderBottom } from "../../Form/input";
import styles from "./account.module.scss";

export function Account() {
    return (
        <section className={styles.accountsContainer}>
            <p className={styles.myAccountP}>My account</p>

            <article>
                <p>My Information</p>
                <div>
                    <MUITextFieldBorderBottom
                        fullWidth
                        name="name"
                        label="name"
                        type="text"
                        value="mritunjaysaha"
                    />
                    <MUITextFieldBorderBottom
                        fullWidth
                        name="email"
                        label="email"
                        type="email"
                        value="asjdkla"
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
