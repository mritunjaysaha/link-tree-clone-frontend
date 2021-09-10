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
    const { _id: userId, username } = useSelector((state) => state.user);

    const [links, setLinks] = useState([]);
    const [isLoading, startLoader, stopLoader] = useLoader();

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

                setLinks([...links, { _id: res.data.currentLink, ...newLink }]);
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
