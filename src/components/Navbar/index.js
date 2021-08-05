import styles from "./navbar.module.scss";
import { Link } from "react-router-dom";

export function Navbar() {
    return (
        <nav className={styles.nav}>
            <div className={styles.logo}>linktree</div>
            <div className={styles.ctaContainer}>
                <div>
                    <Link to="/login" className={styles.login}>
                        Log in
                    </Link>
                    <Link to="/signup" className={styles.signup}>
                        Sign Up Free
                    </Link>
                </div>

                <div className={styles.menu}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </nav>
    );
}
