import { useState } from "react";

import styles from "./admin.module.scss";
import { GoZap, GoKebabVertical } from "react-icons/go";

function UrlItem() {
    return (
        <>
            <div className={styles.urlItem}>
                {/* draggable holder */}
                <div className={styles.urlDrag}>
                    <GoKebabVertical />
                </div>

                {/* url details */}
                <div className={styles.urlDetails}>
                    {/* url name */}
                    <div className={styles.urlContents}>
                        <input type="text" placeholder="Title" />{" "}
                        <div>{/* switch button */}</div>
                    </div>
                    {/* url link */}
                    <div>
                        <input type="text" placeholder="url" />
                    </div>
                    <div>
                        <div>{/* icons */}iii</div>
                        <div>{/* delete */}</div>
                    </div>
                </div>
            </div>
        </>
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

function UrlContainer() {
    const [urls, setUrls] = useState();

    return (
        <section className={styles.urlContainer}>
            <div className={styles.buttonContainer}>
                <button>Add New Link</button>
                <button>
                    <GoZap />
                </button>
            </div>
            <div>
                {urls.map((data) => (
                    <UrlItem />
                ))}{" "}
            </div>
        </section>
    );
}

export function Urls() {
    return (
        <>
            <UrlNav />

            <UrlContainer />
        </>
    );
}
