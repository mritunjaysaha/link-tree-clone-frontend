import styles from "./navbar.module.scss";
import { Link, useLocation } from "react-router-dom";
import { urls } from "../../data/data";

export function Navbar() {
    const { pathname } = useLocation();

    return (
        <nav className={styles.nav}>
            <div className={styles.logo}>
                <Link to={urls.dashboard}>
                    <img src="https://img.icons8.com/color/48/000000/linktree.png" />
                    <span>linktree</span>
                </Link>
            </div>
            <div className={styles.ctaContainer}>
                {pathname === urls.dashboard ? (
                    <div>
                        <Link to={urls.login} className={styles.login}>
                            Log in
                        </Link>
                        <Link to={urls.signup} className={styles.signup}>
                            Sign Up Free
                        </Link>
                    </div>
                ) : (
                    ""
                )}

                <div className={styles.menu}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </nav>
    );
}
