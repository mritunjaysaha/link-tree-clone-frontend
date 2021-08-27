import styles from "./preview.module.scss";
import userStyles from "../../UserView/userview.module.scss";
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
    const user = useSelector((state) => state.user);

    return (
        <section className={styles.previewMobile}>
            {/* <div className={styles.mobileOuter}>
                <div className={styles.mobileInner}>
                    <div className={styles.photo}>img</div>
                    <div className={styles.username}>username</div>
                    <ul className={styles.urls}>url</ul>
                    <div className={styles.logo}>linktree</div>

                    <UserViewContents user={user} />
                </div>
            </div> */}
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
