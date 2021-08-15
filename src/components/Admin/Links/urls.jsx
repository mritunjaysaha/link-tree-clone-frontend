import { useState, useRef } from "react";
import { GoZap, GoKebabVertical } from "react-icons/go";
import {
    UilPen,
    UilTrashAlt,
    UilScenery,
    UilTimes,
} from "@iconscout/react-unicons";

import styles from "./urls.module.scss";

function UrlDeleteContainer({ handleDelete }) {
    return (
        <div className={`${styles.urlUtilityContainer} ${styles.fadeIn}`}>
            <div className={styles.urlCloseDiv}>
                <p>Delete</p>
                <UilTimes className={styles.adminIcon} onClick={handleDelete} />
            </div>
            <div className={styles.urlButtonsContainer}>
                <p>Delete this forever?</p>
                <div className={styles.urlDeleteButtons}>
                    <button type="button">cancel</button>
                    <button type="button">delete</button>
                </div>
            </div>
        </div>
    );
}

function UrlThumbnailContainer({ handleThumbnail }) {
    return (
        <div className={`${styles.urlUtilityContainer} ${styles.fadeIn}`}>
            <div className={styles.urlCloseDiv}>
                <p>Add Thumbnail</p>
                <UilTimes
                    className={styles.adminIcon}
                    onClick={handleThumbnail}
                />
            </div>
            <div className={styles.urlButtonsContainer}>
                <p>Add a Thumbnail or Icon to this Link.</p>
                <div>
                    <button
                        type="button"
                        className={styles.urlThumbnailsButton}
                    >
                        set thumbnail
                    </button>
                </div>
            </div>
        </div>
    );
}

function UrlItem() {
    const [isDelete, setIsDelete] = useState(false);
    const [isThumbnail, setIsThumbnail] = useState(false);
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
        setIsThumbnail(isThumbnail ? !isThumbnail : isThumbnail);
    }

    function handleThumbnail() {
        setIsThumbnail(!isThumbnail);
        setIsDelete(isDelete ? !isDelete : isDelete);
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
                                <UilScenery
                                    className={`${styles.adminIcon} ${
                                        isThumbnail
                                            ? styles.adminIconActive
                                            : ""
                                    }`}
                                    onClick={handleThumbnail}
                                />
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

                {/* conditionally render thumbnail component */}
                {isThumbnail ? (
                    <UrlThumbnailContainer handleThumbnail={handleThumbnail} />
                ) : (
                    ""
                )}
            </section>
        </>
    );
}

export function UrlContainer() {
    const [urls, setUrls] = useState([1, 2, , 4, 4, 3]);

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
