import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AutosizeInput from "react-input-autosize";
import { GoZap, GoKebabVertical } from "react-icons/go";
import {
    UilPen,
    UilTrashAlt,
    UilScenery,
    UilTimes,
} from "@iconscout/react-unicons";
import { useSelector, useDispatch } from "react-redux";
import { updateLinks } from "../../../features/Auth/authSlice";

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
function UrlItem({ link, handleReload, filterLinksArr }) {
    const [isDelete, setIsDelete] = useState(false);
    const [isThumbnail, setIsThumbnail] = useState(false);

    const titleRef = useRef();
    const urlRef = useRef();

    // ? fetch the user id rom redux store
    const { _id: userId } = useSelector((state) => state.user);

    // ? pulling out name and url from linkData
    // ? linkData contains the details of the link
    const { name, url, _id: linkId, order } = link;
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
        console.log("handleDelete");
        setIsDelete(!isDelete);
        setIsThumbnail(isThumbnail ? !isThumbnail : isThumbnail);
    }

    async function handleDeleteRequest() {
        console.log("handleDeleteRequest");

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

    /**
     * * handleOnBlur function will update the link when the focus moves outside
     * ? if the link is new then send request to create link
     * ? else use the existing link's _id to update the link details
     *
     * ^ To create a link we need user id
     * ^ To update a link we need user id and link id
     */
    async function handleOnBlur() {
        const { name, url } = urlData;

        if (!link._id) {
            const newLink = {
                name,
                url,
                author: userId,
                order,
            };

            await axios
                .post(`/api/link/${userId}`, newLink)
                .then((res) => {
                    console.log("link successfully created", res);

                    handleReload();
                })
                .catch((err) => console.log(err.message));
        } else {
            await axios
                .put(`/api/link/${userId}/${linkId}`, urlData)
                .then((res) => {
                    console.log("link successfully updated", res);
                })
                .catch((err) => console.log(err.message));
        }
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
                            <div>{/* switch button */}</div>
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
                            filterLinksArr(link);
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

export function UrlContainer() {
    const username = "testuser";
    const dispatch = useDispatch();
    const { links } = useSelector((state) => state.user);
    const [reload, setReload] = useState(false);

    let filteredLinks = links;

    useEffect(() => {
        async function getURLS() {
            await axios
                .get(`/api/link/${username}`)
                .then((res) => {
                    dispatch(updateLinks(res.data.links));
                })
                .catch((err) => console.log(err.message, err.error));
        }
        getURLS();
    }, [dispatch, reload]);

    function handleAddButton() {
        dispatch(
            updateLinks([
                { _id: "", order: links.length + 1, name: "", url: "" },
                ...links,
            ])
        );
    }

    function handleReload() {
        setReload(!reload);
    }

    function filterLinksArray(link) {
        filteredLinks = filteredLinks.filter((fLink) => link._id !== fLink._id);

        dispatch(updateLinks(filteredLinks));
    }

    return (
        <section className={styles.urlContainer}>
            <div className={styles.buttonContainer}>
                <button onClick={handleAddButton}>Add New Link</button>
                <button>
                    <GoZap />
                </button>
            </div>
            <div>
                {filteredLinks
                    ? filteredLinks.map((link) => {
                          return (
                              <UrlItem
                                  key={link._id ? link._id : new Date()}
                                  link={link}
                                  dispatch={dispatch}
                                  handleReload={handleReload}
                                  filterLinksArr={filterLinksArray}
                              />
                          );
                      })
                    : ""}
            </div>
        </section>
    );
}
