import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { convertToBinary } from "../../../utils/convertToBinary";
import linktree from "../../../assets/linktree.svg";
import axios from "axios";
import { setAuthToken } from "../../../utils/setAuthToken";
import { setAuth } from "../../../features/Auth/authSlice";
import { urls } from "../../../data/data";
import placeholder from "../../../assets/placeholder.png";
import { ClickAwayListener } from "@material-ui/core";

import styles from "./sidenav.module.scss";

export function SideNav() {
    const { photo, username } = useSelector((state) => state.user);
    const [showMenu, setShowMenu] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const activeAccount = location.pathname.includes(urls.admin) === "account";

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
            <Link to={urls.admin}>
                <img src={linktree} alt="linktree" />
            </Link>
            <div
                className={styles.hamburgerMenu}
                onClick={() => {
                    setShowMenu(!showMenu);
                }}
            >
                <div></div>
                <div></div>
                <div></div>
            </div>

            <picture
                onMouseOver={() => {
                    setShowMenu(true);
                }}
                onMouseLeave={() => {
                    setShowMenu(false);
                }}
            >
                <img
                    src={!!photo ? convertToBinary(photo) : placeholder}
                    alt={username ? username : ""}
                />
            </picture>
            {showMenu && (
                <ClickAwayListener
                    onClickAway={() => {
                        setShowMenu(false);
                    }}
                >
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
                            <li
                                className={
                                    activeAccount ? styles.linkLiActive : ""
                                }
                            >
                                <Link
                                    to={`${urls.admin}/account`}
                                    onClick={() => {
                                        setShowMenu(false);
                                    }}
                                >
                                    My Account
                                </Link>
                            </li>
                            <li onClick={handleLogout}>Logout</li>
                        </ul>
                    </div>
                </ClickAwayListener>
            )}
        </nav>
    );
}
