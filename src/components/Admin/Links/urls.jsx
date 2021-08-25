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
    const { links } = useSelector((state) => state.user);
    const [reload, setReload] = useState(false);

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

    return (
        <section className={styles.urlContainer}>
            <div className={styles.buttonContainer}>
                <button onClick={handleAddButton}>Add New Link</button>
                <button>
                    <GoZap />
                </button>
            </div>
            <div>
                <DragAndDrop />
            </div>
        </section>
    );
}
