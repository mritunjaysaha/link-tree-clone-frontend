import {
    Switch,
    Route,
    useRouteMatch,
    Link,
    useLocation,
} from "react-router-dom";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../features/Auth/authSlice";

import { SideNav } from "./Links/sideNav";
import { UrlContainer } from "./Links/urls";
import { Preview } from "./Links/preview";

import styles from "./admin.module.scss";

import { urls } from "../../data/data";

import { Appearance } from "./Appearance";
import { useEffect } from "react";

function UrlNav({ url }) {
    const location = useLocation();

    console.log("location", location.pathname.split("/admin"));

    /**
     * ? Link tab - output will be ["", ""]
     * ? appearance tab - output will be ["", "/appearance"]
     * ? settings tab - output will be ["", "/settings"]
     * ! the last element will be used to identify the active link
     */
    const adminPath = location.pathname.split("/admin");

    return (
        <nav className={styles.urlNav}>
            <Link
                to={`${url}`}
                className={`${styles.urlNavItem} ${
                    adminPath[1] === "" ? styles.urlNavItemActive : ""
                }`}
            >
                Links
            </Link>
            <Link
                to={`${url}/appearance`}
                className={`${styles.urlNavItem} ${
                    adminPath[1] === "/appearance"
                        ? styles.urlNavItemActive
                        : ""
                }`}
            >
                Appearance
            </Link>
            <Link
                to={`${url}/settings`}
                className={`${styles.urlNavItem} ${
                    adminPath[1] === "/settings" ? styles.urlNavItemActive : ""
                }`}
            >
                Settings
            </Link>
        </nav>
    );
}

export function Admin() {
    const { path, url } = useRouteMatch();
    const { _id } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .get(`/api/user/${_id}`)
            .then((res) => {
                const user = res.data;

                const data = {
                    _id: user._id,
                    user: user.username,
                    email: user.email,
                    links: [],
                    photo: user.photo ? user.photo : { data: { data: [] } },
                    profileTitle: user.profileTitle ? user.profileTitle : "",
                    bio: user.bio ? user.bio : "",
                };

                dispatch(setUserData(data));
            })
            .catch((err) => console.log(err));
    }, [_id, dispatch]);

    return (
        <section className={styles.adminContainer}>
            <SideNav />
            <UrlNav url={url} />

            <section className={styles.urlSection}>
                <Switch>
                    <Route exact path={path}>
                        <UrlContainer />
                    </Route>
                    <Route exact path={`${path}/appearance`}>
                        <Appearance />
                    </Route>
                </Switch>
            </section>

            <section className={styles.previewSection}>
                <Preview />
            </section>
        </section>
    );
}
