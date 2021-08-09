import styles from "./admin.module.scss";

function PreviewNav() {
    return (
        <nav className={styles.previewNav}>
            <p>
                My Linktree<span>http://</span>
            </p>
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
