import { Switch, Route, useRouteMatch, Link } from "react-router-dom";

import { SideNav } from "./Links/sideNav";
import { UrlContainer } from "./Links/urls";
import { Preview } from "./Links/preview";

import styles from "./admin.module.scss";

import { urls } from "../../data/data";

import { Appearance } from "./Appearance";

function UrlNav({ url }) {
    return (
        <nav className={styles.urlNav}>
            <Link to={`${url}`} className={styles.urlNavItem}>
                Links
            </Link>
            <Link to={`${url}/appearance`} className={styles.urlNavItem}>
                Appearance
            </Link>
            <Link to={`${url}/settings`} className={styles.urlNavItem}>
                Settings
            </Link>
        </nav>
    );
}

export function Admin() {
    const { path, url } = useRouteMatch();

    console.log({ path, url });

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
