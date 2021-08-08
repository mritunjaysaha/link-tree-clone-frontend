import styles from "./adminNavbar.module.scss";

export function AdminUrlNavbar() {
    return (
        <nav className={styles.urlNavbar}>
            <div className={styles.urlNavItem}>Links</div>
            <div className={styles.urlNavItem}>Appearance</div>
            <div className={styles.urlNavItem}>Settings</div>
        </nav>
    );
}
