import Loader from "react-loader-spinner";
import styles from "./loader.module.scss";

export function LoadingSpinner() {
    return (
        <div className={styles.loaderContainer}>
            <Loader type="TailSpin" color="#fff" />
        </div>
    );
}
