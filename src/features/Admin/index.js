import { SideNav } from "./sideNav";
import { Urls } from "./urls";
import { Preview } from "./preview";

import styles from "./admin.module.scss";

export function Admin() {
    return (
        <section className={styles.adminContainer}>
            <SideNav />
        </section>
    );
}
