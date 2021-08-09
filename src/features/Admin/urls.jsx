import styles from "./admin.module.scss";
import { GoZap } from "react-icons/go";

function UrlNav() {
    return (
        <nav className={styles.urlNav}>
            <div className={styles.urlNavItem}>Links</div>
            <div className={styles.urlNavItem}>Appearance</div>
            <div className={styles.urlNavItem}>Settings</div>
        </nav>
    );
}

function UrlContainer() {
    return (
        <section className={styles.urlContainer}>
            {/* <div className={styles.buttonContainer}>
                <button>Add New Link</button>
                <button>
                    <GoZap />
                </button>
            </div> */}
        </section>
    );
}

export function Urls() {
    return (
        <>
            <UrlNav />
            <UrlContainer />
        </>
    );
}
