import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, updateLinks } from "../../features/Auth/authSlice";
import { convertToBinary } from "../../utils/convertToBinary";
import { ErrorPage } from "./error404";
import { LoadingSpinner } from "../Loader";
import linktree from "../../assets/linktree.svg";
import placeholder from "../../assets/placeholder.png";
import styles from "./userview.module.scss";

function Footer() {
    return (
        <footer className={styles.footer}>
            <img src={linktree} alt="linktree" />
            <p>linktree</p>
        </footer>
    );
}

function Header({ photo, username, profileTitle, bio }) {
    return (
        <header className={styles.header}>
            <picture>
                <img
                    src={!!photo ? convertToBinary(photo) : placeholder}
                    alt={username ? username : ""}
                />
            </picture>
            <p className={styles.profileTitle}>
                {!profileTitle ? `@${username}` : profileTitle}
            </p>
            {bio ? <p className={styles.bio}>{bio}</p> : ""}
        </header>
    );
}
function Links({ links }) {
    const location = useLocation();

    const [isPreview, setIsPreview] = useState(false);

    useEffect(() => {
        const pathname = location.pathname.split("/");
        if (pathname.includes("admin")) {
            setIsPreview(true);
        }
    }, [location]);

    return (
        <section className={styles.contentsSection}>
            {links.length > 0 ? (
                <ul
                    className={
                        isPreview
                            ? `${styles.linksContainer} ${styles.linksContainerPreview}`
                            : `${styles.linksContainer}`
                    }
                >
                    {links.map((link, index) =>
                        link.active ? (
                            <a
                                key={index}
                                rel="noopener noreferrer"
                                target="_blank"
                                href={link.url ? link.url : ""}
                            >
                                <li>{link.name}</li>
                            </a>
                        ) : (
                            ""
                        )
                    )}
                </ul>
            ) : (
                ""
            )}
        </section>
    );
}

export function UserViewContents({ isPreview = false }) {
    const { links, profileTitle, bio, photo, username } = useSelector(
        (state) => state.user
    );

    return (
        <section
            className={
                isPreview
                    ? `${styles.userviewPreview}`
                    : `${styles.userviewInnerSection}`
            }
        >
            <Header
                profileTitle={profileTitle}
                bio={bio}
                photo={photo}
                username={username}
            />
            <Links links={links} isPreview={isPreview} />
            <Footer />
        </section>
    );
}
function UserView() {
    return (
        <section className={styles.userviewSection}>
            <UserViewContents />
        </section>
    );
}

export function UserViewPage() {
    const { username } = useParams();
    const [isUser, setIsUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        async function checkUser(username) {
            await axios
                .get(`api/user/userview/${username}`)
                .then((res) => {
                    if (!res.data) {
                        setIsLoading(false);
                        return;
                    }
                    console.log(res.data);
                    dispatch(setUserData(res.data));
                    setIsUser(res.data.username);
                })
                .catch((err) => {
                    setIsLoading(false);

                    console.log("UserViewPage: error", err.message);
                });
        }

        checkUser(username);
    }, [username, dispatch]);

    useEffect(() => {
        if (!isUser) return;

        async function getLinks(username) {
            await axios
                .get(`api/link/${username}`)
                .then((res) => {
                    console.log(res.data);
                    dispatch(
                        updateLinks(
                            res.data.links.sort((a, b) => a.order - b.order)
                        )
                    );

                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }

        getLinks(username);
    }, [isUser, username, dispatch]);

    if (isLoading) {
        return (
            <div className={styles.loaderContainer}>
                <LoadingSpinner />
            </div>
        );
    }

    return <>{!!isUser ? <UserView /> : <ErrorPage />}</>;
}
