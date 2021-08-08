import styles from "./adminNavbar.module.scss";

export function AdminPreviewNavbar() {
    return (
        <nav className={styles.previewNavbar}>
            <p className={styles.link}>
                My Linktree&nbsp;:&nbsp;<span>https://</span>
            </p>
            <button className={styles.shareButton}>Share</button>
        </nav>
    );
}
