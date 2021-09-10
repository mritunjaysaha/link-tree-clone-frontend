import { useEffect } from "react";
import {
    Switch,
    Route,
    useRouteMatch,
    Link,
    useLocation,
} from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import {
    setPhoto,
    setUserData,
    updateLinks,
} from "../../features/Auth/authSlice";
// nav
import { SideNav } from "./Links/sideNav";
import { UrlContainer } from "./Links/urls";
import { Preview } from "./Links/preview";
// pae component
import { Appearance } from "./Appearance";
import { Account } from "./Account";

import styles from "./admin.module.scss";

function UrlNav({ url }) {
    const location = useLocation();

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
            {/* <Link
                to={`${url}/settings`}
                className={`${styles.urlNavItem} ${
                    adminPath[1] === "/settings" ? styles.urlNavItemActive : ""
                }`}
            >
                Settings
            </Link> */}
        </nav>
    );
}

export function Admin() {
    const { path, url } = useRouteMatch();
    const { _id, username } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const location = useLocation();
    const isAccount =
        location.pathname.split("/")[2] === "account" ? true : false;

    useEffect(() => {
        axios
            .get(`/api/user/${_id}`)
            .then((res) => {
                dispatch(setUserData(res.data));
            })
            .catch((err) => console.log(err.message));
    }, [_id, dispatch]);

    useEffect(() => {
        if (username) {
            axios
                .get(`/api/user/photo/${username}`)
                .then((res) => {
                    dispatch(setPhoto(res.data.photo.data));
                })
                .catch((err) => console.log("admin", err.message));
        }
    }, [username, dispatch]);

    useEffect(() => {
        function getURLS() {
            axios
                .get(`/api/link/${username}`)
                .then((res) => {
                    res.data.links.sort((a, b) => a.order - b.order);
                    dispatch(updateLinks(res.data.links));

                    console.log("links fetched");
                })
                .catch((err) => console.log(err.message, err.error));
        }
        getURLS();
    }, [username, dispatch]);

    return (
        <section className={styles.adminContainer}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{username}</title>
            </Helmet>

            <SideNav />
            {!isAccount && <UrlNav url={url} />}

            <section
                className={
                    !isAccount
                        ? `${styles.urlSection}`
                        : `${styles.accountSection}`
                }
            >
                <Switch>
                    <Route exact path={`${path}/account`}>
                        <Account />
                    </Route>
                    <Route exact path={path}>
                        <UrlContainer />
                    </Route>
                    <Route exact path={`${path}/appearance`}>
                        <Appearance />
                    </Route>
                </Switch>
            </section>

            {!isAccount && (
                <section className={styles.previewSection}>
                    <Preview />
                </section>
            )}
        </section>
    );
}
