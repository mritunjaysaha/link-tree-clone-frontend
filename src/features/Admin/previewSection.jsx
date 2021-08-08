import { AdminPreviewNavbar } from "./Navbar/adminPreviewNavbar";

import styles from "./admin.module.scss";

export function PreviewSection() {
    return (
        <section className={styles.previewSection}>
            <AdminPreviewNavbar />
        </section>
    );
}
