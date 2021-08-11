import { useState, useRef } from "react";

import styles from "./admin.module.scss";
import { GoZap, GoKebabVertical } from "react-icons/go";

import {
    UilPen,
    UilTrashAlt,
    UilScenery,
    UilTimes,
} from "@iconscout/react-unicons";

function UrlDeleteContainer({ handleDelete }) {
    return (
        <div className={styles.urlDeleteContainer}>
            <div className={styles.deleteCloseDiv}>
                <p>Delete</p>
                <UilTimes className={styles.adminIcon} onClick={handleDelete} />
            </div>
            <div className={styles.deleteButtonsContainer}>
                <p>Delete this forever?</p>
                <div>
                    <button type="button">cancel</button>
                    <button type="button">delete</button>
                </div>
            </div>
        </div>
    );
}

function UrlItem() {
    const [isDelete, setIsDelete] = useState(false);
    const titleRef = useRef();
    const urlRef = useRef();

    function handleTitleClick() {
        titleRef.current.focus();
    }

    function handleUrlClick() {
        urlRef.current.focus();
    }

    function handleDelete() {
        setIsDelete(!isDelete);
    }

    return (
        <>
            <section className={styles.urlItemSection}>
                <div className={styles.urlItemDiv}>
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
                                <UilScenery className={styles.adminIcon} />
                            </div>
                            <div>
                                {/* delete */}
                                <UilTrashAlt
                                    id="delete-icon"
                                    className={`${styles.adminIcon} ${
                                        isDelete ? styles.adminIconActive : ""
                                    }`}
                                    onClick={handleDelete}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Conditionally render delete component */}
                {isDelete ? (
                    <UrlDeleteContainer handleDelete={handleDelete} />
                ) : (
                    ""
                )}
            </section>
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
