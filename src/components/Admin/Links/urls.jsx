import { useState, useEffect } from "react";
import axios from "axios";
import { GoZap } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import { updateLinks } from "../../../features/Auth/authSlice";

import styles from "./urls.module.scss";
import { DragAndDrop } from "../DragAndDrop";

export function UrlContainer() {
    const username = "testuser";
    const dispatch = useDispatch();
    const { links, _id: userId } = useSelector((state) => state.user);
    const [reload, setReload] = useState("");

    useEffect(() => {
        function getURLS() {
            axios
                .get(`/api/link/${username}`)
                .then((res) => {
                    dispatch(updateLinks(res.data.links));
                })
                .catch((err) => console.log(err.message, err.error));
        }
        getURLS();
    }, [dispatch, reload]);

    async function handleAddButton() {
        const newLink = {
            name: "",
            url: "",
            author: userId,
        };

        console.log(axios.defaults.headers);

        await axios
            .post(`/api/link/${userId}`, newLink)
            .then((res) => {
                console.log(res.data.currentLink);

                dispatch(
                    updateLinks([
                        { _id: res.data.currentLink, ...newLink },
                        ...links,
                    ])
                );

                handleReload();
            })
            .catch((err) => console.log(err.message));

        console.log("hre", links, { userId });
    }

    function handleReload() {
        setReload(!reload);
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
                <DragAndDrop links={links} userId={userId} />
            </div>
        </section>
    );
}
