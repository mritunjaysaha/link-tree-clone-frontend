import styles from "./appearance.module.scss";

function Profile() {
    return (
        <section className={styles.profileSection}>
            <p>profile</p>
            <figure>
                <img src="" alt="" />
            </figure>
        </section>
    );
}

function Theme() {}

export function Appearance() {
    return (
        <>
            {/* <Profile />
             */}
            Appearance
        </>
    );
}
