import styles from "../admin.module.scss";
import linktree from "../../../assets/linktree.svg";
import { useSelector } from "react-redux";
import { convertToBinary } from "../../../utils/convertToBinary";
export function SideNav() {
    const { photo, username } = useSelector((state) => state.user);

    return (
        <nav className={styles.sideNav}>
            <img src={linktree} alt="linktree" />
            <picture>
                <img
                    src={convertToBinary(photo)}
                    alt={username ? username : ""}
                />
            </picture>
        </nav>
    );
}
