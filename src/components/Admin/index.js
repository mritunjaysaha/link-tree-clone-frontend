import { SideNav } from "./Links/sideNav";
import { Urls } from "./Links/urls";
import { Preview } from "./Links/preview";

import styles from "./admin.module.scss";

export function Admin() {
    return (
        <section className={styles.adminContainer}>
            <SideNav />
            <section className={styles.urlSection}>
                <Urls />
            </section>
            <section className={styles.previewSection}>
                <Preview />
            </section>
        </section>
    );
}
