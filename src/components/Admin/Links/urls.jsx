import { useState, useEffect } from "react";
import axios from "axios";
// import { GoZap } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import { updateLinks } from "../../../features/Auth/authSlice";
import { DragAndDrop } from "../DragAndDrop";
import { useLoader } from "../../../customHooks/loadingHook";
import styles from "./urls.module.scss";
import { LoadingSpinner } from "../../Loader";

export function UrlContainer() {
    const dispatch = useDispatch();
    const { _id: userId, links } = useSelector((state) => state.user);
    const [isLoading, startLoader, stopLoader] = useLoader();

    async function handleAddButton() {
        startLoader();

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

                stopLoader();
            })
            .catch((err) => {
                console.log(err.message);
                stopLoader();
            });
    }

    return (
        <section className={styles.urlContainer}>
            <div className={styles.buttonContainer}>
                <button
                    onClick={handleAddButton}
                    className={styles.loaderContainer}
                >
                    {!isLoading ? "Add New Link" : <LoadingSpinner />}
                </button>
                {/* <button>
                    <GoZap />
                </button> */}
            </div>

            <div>{links.length ? <DragAndDrop userId={userId} /> : ""}</div>
        </section>
    );
}
