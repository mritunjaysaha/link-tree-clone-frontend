import { useState } from "react";
import { useSelector } from "react-redux";

import { convertToBinary } from "../../../utils/convertToBinary";

import styles from "./sidenav.module.scss";
import linktree from "../../../assets/linktree.svg";

export function SideNav() {
    const { photo, username } = useSelector((state) => state.user);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        console.log("current target", event.currentTarget);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <nav className={styles.sideNav}>
            <img src={linktree} alt="linktree" />
            <picture onClick={handleClick}>
                <img
                    src={convertToBinary(photo)}
                    alt={username ? username : ""}
                />
            </picture>
            <div className={styles.sideNavMenu}>
                <p>My Account</p>
                <p>Logout</p>
            </div>
        </nav>
    );
}
