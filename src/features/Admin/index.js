import { AdminSideNavbar } from "./Navbar/adminSideNavbar";
import { UrlSection } from "./urlsSection";
import { PreviewSection } from "./previewSection";
import styles from "./admin.module.scss";

export function Admin() {
    return (
        <section className={styles.adminContainer}>
            <AdminSideNavbar />
            <UrlSection />
            <PreviewSection />
        </section>
    );
}
