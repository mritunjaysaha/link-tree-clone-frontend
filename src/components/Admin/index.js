import { useEffect } from "react";
import {
    Switch,
    Route,
    useRouteMatch,
    Link,
    useLocation,
} from "react-router-dom";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { setPhoto, setUserData } from "../../features/Auth/authSlice";
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
        axios
            .get(`/api/user/photo/${username}`)
            .then((res) => {
                console.log("new photo", res.data);

                dispatch(setPhoto(res.data.photo.data));
            })
            .catch((err) => console.log(err.message));
    }, []);

    return (
        <section className={styles.adminContainer}>
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
