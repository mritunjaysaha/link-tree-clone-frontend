import styles from "./error404.module.scss";

export function ErrorPage() {
    return (
        <section className={styles.errorPageSection}>
            404 user not found
        </section>
    );
}
