import styles from "./navbar.module.scss";
import { Link, useLocation } from "react-router-dom";
import { urls } from "../../data/data";
import linktree from "../../assets/linktree.svg";

export function Navbar() {
    const { pathname } = useLocation();
    const arr = ["/", "/login", "/register"];
    return (
        <>
            {arr.includes(pathname) ? (
                <nav className={styles.nav}>
                    <div className={styles.logo}>
                        <Link to={urls.dashboard}>
                            <img src={linktree} alt="linktree icon" />
                            <span>linktree</span>
                        </Link>
                    </div>
                    <div className={styles.ctaContainer}>
                        {pathname === urls.dashboard ? (
                            <div>
                                <Link to={urls.login} className={styles.login}>
                                    Log in
                                </Link>
                                <Link
                                    to={urls.signup}
                                    className={styles.signup}
                                >
                                    Sign Up Free
                                </Link>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </nav>
            ) : (
                ""
            )}
        </>
    );
}
