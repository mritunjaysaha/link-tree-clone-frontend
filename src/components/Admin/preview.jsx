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
        <section className={styles.previewMobile}>
            <div className={styles.mobileOuter}>
                <div className={styles.mobileInner}>
                    <div className={styles.photo}>img</div>
                    <div className={styles.username}>username</div>
                    <ul className={styles.urls}>url</ul>
                    <div className={styles.logo}>linktree</div>
                </div>
            </div>
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
