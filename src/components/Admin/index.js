import { BrowserRouter, Route } from "react-router-dom";

import { SideNav } from "./Links/sideNav";
import { Urls } from "./Links/urls";
import { Preview } from "./Links/preview";

import styles from "./admin.module.scss";

import { urls } from "../../data/data";

function UrlComponent() {
    return (
        <section className={styles.urlSection}>
            <Urls />
        </section>
    );
}

function UrlNav() {
    return (
        <nav className={styles.urlNav}>
            <div className={styles.urlNavItem}>Links</div>
            <div className={styles.urlNavItem}>Appearance</div>
            <div className={styles.urlNavItem}>Settings</div>
        </nav>
    );
}

export function Admin() {
    return (
        <section className={styles.adminContainer}>
            <SideNav />
            <UrlNav />

            <BrowserRouter>
                <Route exact path={urls.admin} component={UrlComponent} />
            </BrowserRouter>

            <section className={styles.previewSection}>
                <Preview />
            </section>
        </section>
    );
}
