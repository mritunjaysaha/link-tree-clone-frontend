import styles from "./error404.module.scss";
import errorIllustration from "../../assets/undraw_page_not_found_su7k.svg";

export function ErrorPage() {
    return (
        <section className={styles.errorPageSection}>
            <div className={styles.errorContainerDiv}>
                <img src={errorIllustration} alt="404" />
                <div>
                    <p>user not found</p>
                </div>
            </div>
        </section>
    );
}
