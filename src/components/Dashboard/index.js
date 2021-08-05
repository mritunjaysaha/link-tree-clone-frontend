import styles from "./dashboard.module.scss";
import { Link } from "react-router-dom";

export function Dashboard() {
    return (
        <section className={styles.dashboardSection}>
            <div>
                <h3>The only link you'll ever need</h3>
                <p>
                    Connect audiences to all of your content with just one link
                </p>
            </div>
            <Link to="/signup" className={styles.signup}>
                get started for free
            </Link>

            <p>
                Already have an account?{" "}
                <span>
                    <Link to="/login" className={styles.login}>
                        Log in
                    </Link>
                </span>
            </p>
        </section>
    );
}
