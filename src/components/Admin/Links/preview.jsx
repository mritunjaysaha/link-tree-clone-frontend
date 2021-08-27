import styles from "./preview.module.scss";
import { UserViewContents } from "../../UserView";
import { useSelector } from "react-redux";

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
    const { user } = useSelector((state) => state);

    return (
        <section className={styles.previewMobile}>
            <div className={styles.mobileOuter}>
                <UserViewContents user={user} isPreview={true} />
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
