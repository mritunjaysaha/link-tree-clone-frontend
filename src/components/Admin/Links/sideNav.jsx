import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { convertToBinary } from "../../../utils/convertToBinary";

import styles from "./sidenav.module.scss";
import linktree from "../../../assets/linktree.svg";
import axios from "axios";
import { setAuthToken } from "../../../utils/setAuthToken";
import { setAuth } from "../../../features/Auth/authSlice";
import { urls } from "../../../data/data";
import placeholder from "../../../assets/placeholder.png";

function useOutsideAlerter(ref) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

export function SideNav() {
    const { photo, username } = useSelector((state) => state.user);
    const [showMenu, setShowMenu] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const activeAccount = location.pathname.split("/")[2] === "account";

    const menuRef = useRef(null);

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

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef, showMenu]);

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
                    menuRef.current.focus();
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
                            className={activeAccount ? styles.linkLiActive : ""}
                        >
                            <Link to={`${urls.admin}/account`}>My Account</Link>
                        </li>
                        <li onClick={handleLogout}>Logout</li>
                    </ul>
                </div>
            )}
        </nav>
    );
}
