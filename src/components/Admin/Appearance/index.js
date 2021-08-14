import styles from "./appearance.module.scss";
import { TextField } from "@material-ui/core";

function Profile() {
    return (
        <section className={styles.profileSection}>
            <p>profile</p>
            <div className={styles.profileInner}>
                <figure>
                    <img src="" alt="" />

                    <figcaption>
                        <button>Pick an image</button>
                        <button>Remove</button>
                    </figcaption>
                </figure>

                <div className={styles.inputDiv}>
                    <TextField />
                </div>
            </div>
        </section>
    );
}

function Theme() {}

export function Appearance() {
    return (
        <section className={styles.appearanceSection}>
            <Profile />
        </section>
    );
}
