import { AdminUrlNavbar } from "./Navbar/adminUrlNavbar";

import styles from "./admin.module.scss";

export function UrlSection() {
    return (
        <section className={styles.urlSection}>
            <AdminUrlNavbar />
        </section>
    );
}
