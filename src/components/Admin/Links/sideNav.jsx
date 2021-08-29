import { useState } from "react";

import { useSelector } from "react-redux";
import { convertToBinary } from "../../../utils/convertToBinary";

import styles from "./sidenav.module.scss";
import linktree from "../../../assets/linktree.svg";

export function SideNav() {
    const { photo, username } = useSelector((state) => state.user);

    const [showModal, setShowModal] = useState(false);

    function handleMouseEvent() {
        setShowModal(!showModal);
    }

    return (
        <nav className={styles.sideNav}>
            <img src={linktree} alt="linktree" />
            <picture
                onMouseEnter={handleMouseEvent}
                onMouseLeave={handleMouseEvent}
            >
                <img
                    src={convertToBinary(photo)}
                    alt={username ? username : ""}
                />
            </picture>
            {showModal && (
                <div className={styles.sideNavModal}>
                    <div data-my-account>My Account</div>
                    <div data-logout>logout</div>
                </div>
            )}
        </nav>
    );
}
