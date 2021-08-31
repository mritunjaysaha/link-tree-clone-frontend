import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { convertToBinary } from "../../../utils/convertToBinary";

import styles from "./sidenav.module.scss";
import linktree from "../../../assets/linktree.svg";
import axios from "axios";
import { setAuthToken } from "../../../utils/setAuthToken";
import { setAuth } from "../../../features/Auth/authSlice";
import { urls } from "../../../data/data";

export function SideNav() {
    const user = useSelector((state) => state.user);

    console.log("new", user);

    const { username, photo } = user;
    const [showMenu, setShowMenu] = useState(false);

    const dispatch = useDispatch();

    async function handleLogout() {
        await axios
            .get(`/api/logout`)
            .then((res) => {
                <Redirect to="/login" />;
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
                    <p>{username}</p>
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
