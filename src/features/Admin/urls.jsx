import { useState, useRef } from "react";

import styles from "./admin.module.scss";
import { GoZap, GoKebabVertical } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { HiOutlinePhotograph } from "react-icons/hi";

import { UilPen } from "@iconscout/react-unicons";

function UrlItem() {
    const titleRef = useRef();
    const urlRef = useRef();

    function handleTitleClick() {
        titleRef.current.focus();
    }

    function handleUrlClick() {
        urlRef.current.focus();
    }

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
                        <input
                            name="test"
                            type="text"
                            placeholder="Title"
                            value="value"
                            ref={titleRef}
                        />
                        <span>
                            <UilPen
                                className={styles.adminIcon}
                                onClick={handleTitleClick}
                            />
                        </span>
                        <div>{/* switch button */}</div>
                    </div>
                    {/* url link */}
                    <div>
                        <input
                            type="text"
                            placeholder="url"
                            value="url"
                            ref={urlRef}
                        />
                        <span>
                            <UilPen
                                className={styles.adminIcon}
                                onClick={handleUrlClick}
                            />
                        </span>
                    </div>
                    <div className={styles.iconContainer}>
                        <div>
                            {/* icons */}
                            <HiOutlinePhotograph className={styles.adminIcon} />
                        </div>
                        <div>
                            {/* delete */}
                            <MdDelete className={styles.adminIcon} />
                        </div>
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
    const [urls, setUrls] = useState([1, 2, 3]);

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
