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
    const [showData, setShowData] = useState(false);

    const [initialData, setInitialData] = useState({});

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

    useEffect(() => {
        const newLinks = {};

        const newLinkOrder = [];

        links.map((link, index) => {
            newLinks[`link${index}`] = {
                id: `link${index}`,
                content: link,
            };

            newLinkOrder.push(`link${index}`);
        });

        console.log("ddd", newLinks, newLinkOrder);

        setInitialData({
            links: newLinks,
            columns: {
                column0: { id: "column0", linkOrder: newLinkOrder },
            },
            columnOrder: ["column0"],
        });

        console.log("here", initialData);
    }, [links, showData]);

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
                {initialData ? <DragAndDrop initialData={initialData} /> : ""}
            </div>
        </section>
    );
}
