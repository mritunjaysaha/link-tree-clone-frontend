import styles from "./admin.module.scss";

function PreviewNav() {
    return (
        <nav className={styles.previewNav}>
            <p>
                My Linktree:&nbsp;<span>http://</span>
            </p>
            <button className={styles.previewShareButton}>Share</button>
        </nav>
    );
}

function MobilePreview() {
    return (
        <section>
            <div className={styles.previewMobile}></div>
        </section>
    );
}

export function Preview() {
    return (
        <>
            <PreviewNav />
            <MobilePreview />
        </>
    );
}
