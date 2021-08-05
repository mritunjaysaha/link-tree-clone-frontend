import styles from "./navbar.module.scss";
import { Link } from "react-router-dom";

export function Navbar() {
    return (
        <nav className={styles.nav}>
            <div className={styles.logo}>linktree</div>
            <div>
                <Link to="/login">Log In</Link>
                <Link to="/signup">Sign Up</Link>
            </div>
        </nav>
    );
}
