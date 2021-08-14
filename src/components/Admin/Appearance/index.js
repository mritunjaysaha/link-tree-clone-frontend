import styles from "./appearance.module.scss";

function Profile() {
    return (
        <section className={styles.profileSection}>
            <p>profile</p>
            <figure>
                <img src="" alt="" />

                <figcaption>
                    <button>Pick an image</button>
                    <button>Remove</button>
                </figcaption>
            </figure>
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
