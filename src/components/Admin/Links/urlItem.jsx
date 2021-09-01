import { useState, useRef, useEffect } from "react";
import axios from "axios";
import AutosizeInput from "react-input-autosize";
import { GoKebabVertical } from "react-icons/go";
import {
    UilPen,
    UilTrashAlt,
    UilScenery,
    UilTimes,
} from "@iconscout/react-unicons";
import { useSelector } from "react-redux";

import styles from "./urls.module.scss";

function UrlDeleteContainer({ handleDelete, handleCancel }) {
    return (
        <div className={`${styles.urlUtilityContainer} ${styles.fadeIn}`}>
            <div className={styles.urlCloseDiv}>
                <p>Delete</p>
                <UilTimes className={styles.adminIcon} onClick={handleDelete} />
            </div>
            <div className={styles.urlButtonsContainer}>
                <p>Delete this forever?</p>
                <div className={styles.urlDeleteButtons}>
                    <button type="button" onClick={handleCancel}>
                        cancel
                    </button>
                    <button type="button" onClick={handleDelete}>
                        delete
                    </button>
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

/**
 *
 * @param {data} Object - link object fields -- _id, name, url, author
 * @returns
 */
export function UrlItem({
    link,
    handleReload,
    filterLinksArr,
    innerRef,
    ...rest
}) {
    console.log("link", link);
    const [isDelete, setIsDelete] = useState(false);
    const [isThumbnail, setIsThumbnail] = useState(false);
    const [isActive, setIsActive] = useState(link.active ? link.active : false);
    const [isBlur, setIsBlur] = useState(false);

    const titleRef = useRef();
    const urlRef = useRef();

    // ? fetch the user id rom redux store
    const { _id: userId } = useSelector((state) => state.user);

    // ? pulling out name and url from linkData
    // ? linkData contains the details of the link
    const { name, url, _id: linkId } = link;
    const [urlData, setUrlData] = useState({
        name: name ? name : "",
        url: url ? url : "",
    });

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

    async function handleDeleteRequest() {
        await axios
            .delete(`/api/link/${userId}/${linkId}`)
            .then((res) => console.log("link successfully deleted"))
            .catch((err) => console.log("failed to delete link", err.message));
    }

    function handleThumbnail() {
        setIsThumbnail(!isThumbnail);
        setIsDelete(isDelete ? !isDelete : isDelete);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setUrlData((urlData) => ({ ...urlData, [name]: value }));
    }

    function handleOnBlur() {
        setIsBlur(!isBlur);
    }

    useEffect(() => {
        async function handleUpdate() {
            const updateData = {
                ...urlData,
                active: isActive,
            };
            console.log(updateData);

            await axios
                .put(`/api/link/${userId}/${linkId}`, updateData)
                .then((res) => {
                    console.log("link successfully updated", res);
                })
                .catch((err) => console.log(err.message));
        }
        handleUpdate();
    }, [isActive, isBlur, linkId, urlData, userId]);
    return (
        <>
            <section className={styles.urlItemSection} ref={innerRef} {...rest}>
                <div className={styles.urlItemDiv}>
                    {/* draggable holder */}
                    <div className={styles.urlDrag}>
                        <GoKebabVertical />
                    </div>

                    {/* url details */}
                    <div className={styles.urlDetails}>
                        {/* url name */}
                        <div className={styles.urlContents}>
                            <div className={styles.urlContentsLeft}>
                                <AutosizeInput
                                    ref={titleRef}
                                    name="name"
                                    type="text"
                                    placeholder="Title"
                                    value={urlData.name}
                                    onChange={handleChange}
                                    onBlur={handleOnBlur}
                                />
                                <span>
                                    <UilPen
                                        className={styles.adminIcon}
                                        onClick={handleTitleClick}
                                    />
                                </span>
                            </div>
                            <div className={styles.urlContentsRight}>
                                {/* switch button */}
                                <div
                                    className={
                                        !isActive
                                            ? `${styles.switchButton}`
                                            : `${styles.switchButton} ${styles.switchButtonActive} ${styles.switchButtonCircleActive}`
                                    }
                                    onClick={() => {
                                        setIsActive(!isActive);
                                    }}
                                >
                                    <div
                                        className={styles.switchButtonCircle}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        {/* url link */}
                        <div>
                            <AutosizeInput
                                ref={urlRef}
                                name="url"
                                type="text"
                                placeholder="url"
                                value={urlData.url}
                                onChange={handleChange}
                                onBlur={handleOnBlur}
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
                    <UrlDeleteContainer
                        handleDelete={() => {
                            handleDelete();
                            handleDeleteRequest();
                        }}
                        handleCancel={handleDelete}
                    />
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
