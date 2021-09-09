import { useState, useRef } from "react";
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

    const menuRef = useRef(null);

    async function handleLogout() {
        await axios
            .get(`/api/logout`)
            .then(() => {
                history.push(urls.login);
                localStorage.removeItem("jwtToken");
                setAuthToken("");
                dispatch(setAuth({ _id: "" }));
                // setShowMenu(!showMenu);
            })
            .catch((err) => console.log(err.message));
    }

    function handleMenu() {
        setShowMenu(!showMenu);
    }

    return (
        <nav className={styles.sideNav}>
            <Link to={urls.admin}>
                <img src={linktree} alt="linktree" />
            </Link>
            <div
                ref={menuRef}
                className={styles.menu}
                onClick={() => {
                    setShowMenu(!showMenu);
                    // menuRef.current.focus();
                }}
            >
                <div></div>
                <div></div>
                <div></div>
            </div>

            <picture onMouseOver={handleMenu} onMouseLeave={handleMenu}>
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
