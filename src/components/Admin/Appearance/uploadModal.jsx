import styles from "./uploadModal.module.scss";
import { UilFilePlus, UilTimes, UilLaptop } from "@iconscout/react-unicons";

export function UploadModal({ handleClose }) {
    return (
        <section className={styles.uploadModalContainer}>
            <nav>
                <p className={styles.navActive}>
                    <UilLaptop className={styles.adminIcon} />
                    <span>My Device</span>
                </p>
            </nav>
            <section className={styles.contentsSection}>
                <div className={styles.topDiv}>
                    <UilLaptop className={styles.adminIcon} />
                    <UilTimes
                        className={`${styles.adminIcon} ${styles.closeIcon}`}
                        onClick={handleClose}
                    />
                </div>
                <div className={styles.dragComponentOuter}>
                    <div className={styles.dragComponentInner}>
                        <UilFilePlus className={styles.fileIcon} />
                        <h3>Select files to upload</h3>
                        <p>or Drag and Drop, Copy and Paste Files</p>
                    </div>
                </div>
            </section>
        </section>
    );
}
