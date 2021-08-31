import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { convertToBinary } from "../../../utils/convertToBinary";

import styles from "./sidenav.module.scss";
import linktree from "../../../assets/linktree.svg";
import axios from "axios";
import { setAuthToken } from "../../../utils/setAuthToken";
import { setAuth } from "../../../features/Auth/authSlice";
import { urls } from "../../../data/data";

export function SideNav() {
    const { photo, username } = useSelector((state) => state.user);
    const [showMenu, setShowMenu] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    async function handleLogout() {
        await axios
            .get(`/api/logout`)
            .then(() => {
                history.push(urls.login);
                localStorage.removeItem("jwtToken");
                setAuthToken("");
                dispatch(setAuth({ _id: "" }));
            })
            .catch((err) => console.log(err.message));
    }

    return (
        <nav className={styles.sideNav}>
            <img src={linktree} alt="linktree" />
            <picture
                onMouseOver={() => {
                    setShowMenu(true);
                }}
                onMouseLeave={() => {
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
                    <p>{username ? username : ""}</p>
                    <ul>
                        <li>
                            <Link to={`${urls.admin}/account`}>My Account</Link>
                        </li>
                        <li onClick={handleLogout}>Logout</li>
                    </ul>
                </div>
            )}
        </nav>
    );
}
