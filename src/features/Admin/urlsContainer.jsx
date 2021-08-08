import { GoZap } from "react-icons/go";

import styles from "./admin.module.scss";

export function UrlContainer() {
    return (
        <section className={styles.urlContainer}>
            <div className={styles.divButtonsContainer}>
                <button>add new link</button>
                <button>
                    <GoZap />
                </button>
            </div>
        </section>
    );
}
