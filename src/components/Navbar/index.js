import styles from "./navbar.module.scss";
import { Link } from "react-router-dom";

export function Navbar() {
    return (
        <nav className={styles.nav}>
            <div className={styles.logo}>
                <img src="https://img.icons8.com/color/48/000000/linktree.png" />
                <span>linktree</span>
            </div>
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
