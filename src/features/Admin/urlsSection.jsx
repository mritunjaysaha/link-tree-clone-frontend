import { AdminUrlNavbar } from "./Navbar/adminUrlNavbar";
import { UrlContainer } from "./urlsContainer";
import styles from "./admin.module.scss";

export function UrlSection() {
    return (
        <section className={styles.urlSection}>
            <AdminUrlNavbar />
            <UrlContainer />
        </section>
    );
}
