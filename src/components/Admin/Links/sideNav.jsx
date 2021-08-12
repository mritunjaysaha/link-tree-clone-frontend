import styles from "../admin.module.scss";
import linktree from "../../../assets/linktree.svg";

export function SideNav() {
    return (
        <nav className={styles.sideNav}>
            <img src={linktree} alt="linktree" />
            <img src="https://dummyimage.com/30x30.jpg" alt="" />
        </nav>
    );
}
