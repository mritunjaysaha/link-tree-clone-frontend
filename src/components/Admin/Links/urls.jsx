import { useState, useEffect } from "react";
import axios from "axios";
import { GoZap } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import { updateLinks } from "../../../features/Auth/authSlice";

import styles from "./urls.module.scss";
import { DragAndDrop } from "../DragAndDrop";

export function UrlContainer() {
    const dispatch = useDispatch();
    const { _id: userId, username } = useSelector((state) => state.user);

    const [links, setLinks] = useState([]);

    useEffect(() => {
        function getURLS() {
            axios
                .get(`/api/link/${username}`)
                .then((res) => {
                    res.data.links.sort((a, b) => a.order - b.order);
                    dispatch(updateLinks(res.data.links));

                    setLinks(res.data.links);
                })
                .catch((err) => console.log(err.message, err.error));
        }
        getURLS();
    }, [dispatch, username]);

    async function handleAddButton() {
        const newLink = {
            order: links.length + 1,
            name: "",
            url: "",
            author: userId,
        };

        await axios
            .post(`/api/link/${userId}`, newLink)
            .then((res) => {
                dispatch(
                    updateLinks([
                        ...links,
                        { _id: res.data.currentLink, ...newLink },
                    ])
                );

                setLinks([...links, { _id: res.data.currentLink, ...newLink }]);
            })
            .catch((err) => console.log(err.message));
    }

    return (
        <section className={styles.urlContainer}>
            <div className={styles.buttonContainer}>
                <button onClick={handleAddButton}>Add New Link</button>
                {/* <button>
                    <GoZap />
                </button> */}
            </div>

            <div>
                {links.length ? (
                    <DragAndDrop links={links} userId={userId} />
                ) : (
                    ""
                )}
            </div>
        </section>
    );
}
