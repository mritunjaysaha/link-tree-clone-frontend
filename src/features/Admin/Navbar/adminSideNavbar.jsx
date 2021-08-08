import linktree from "../../../assets/linktree.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";

import styles from "./adminNavbar.module.scss";

export function AdminSideNavbar() {
    return (
        <>
            <nav className={styles.sideNav}>
                <img src={linktree} alt="linktree" className="logo-img" />
                <FontAwesomeIcon
                    icon={faUserCircle}
                    className="fontawesome-icon"
                />
            </nav>
        </>
    );
}
