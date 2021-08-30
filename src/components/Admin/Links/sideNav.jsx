import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { convertToBinary } from "../../../utils/convertToBinary";

import styles from "./sidenav.module.scss";
import linktree from "../../../assets/linktree.svg";

export function SideNav() {
    const { photo, username } = useSelector((state) => state.user);
    const [showMenu, setShowMenu] = useState(false);

    return (
        <nav className={styles.sideNav}>
            <img src={linktree} alt="linktree" />
            <picture
                onMouseEnter={() => {
                    setShowMenu(true);
                }}
                onBlur={() => {
                    setShowMenu(false);
                }}
            >
                <img
                    src={convertToBinary(photo)}
                    alt={username ? username : ""}
                />
            </picture>
            {showMenu && (
                <div
                    className={styles.sideNavMenu}
                    onMouseEnter={() => {
                        setShowMenu(true);
                    }}
                    onMouseLeave={() => {
                        setShowMenu(false);
                    }}
                >
                    <p>{username}</p>
                    <ul>
                        <li>
                            <Link to="/">My Account</Link>
                        </li>
                        <li>Logout</li>
                    </ul>
                </div>
            )}
        </nav>
    );
}
