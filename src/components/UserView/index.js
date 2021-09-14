import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, updateLinks } from "../../features/Auth/authSlice";
import { convertToBinary } from "../../utils/convertToBinary";

import linktree from "../../assets/linktree.svg";
import placeholder from "../../assets/placeholder.png";
import styles from "./userview.module.scss";
import { ErrorPage } from "./error404";

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
    return (
        <section className={styles.contentsSection}>
            {/* links */}
            {links.length > 0 ? (
                <ul className={styles.linksContainer}>
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

export function UserViewContents({ user, isPreview = false }) {
    const { links, profileTitle, bio, photo, username } = user;

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
            <Links links={links} />
            <Footer />
        </section>
    );
}
function UserView({ user: username }) {
    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        if (username) {
            axios
                .get(`/api/user/userview/${username}`)
                .then((res) => {
                    const data = {
                        ...res.data,
                        photo: res.data.photo.data.data,
                    };

                    console.log(data);

                    dispatch(setUserData(data));
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    }, [dispatch, username]);

    return (
        <section className={styles.userviewSection}>
            <UserViewContents user={user} />
        </section>
    );
}

export function UserViewPage() {
    window.localStorage.removeItem("jwtToken");

    const { username } = useParams();
    const [isUser, setIsUser] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        async function checkUser(username) {
            await axios
                .get(`api/user/userview/${username}`)
                .then((res) => {
                    setIsUser(true);
                    console.log(res.data);

                    dispatch(setUserData(res.data));
                })
                .catch((err) => {
                    console.log("UserViewPage: error", err.message);
                    setIsUser(false);
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
                    dispatch(updateLinks(res.data.links));
                })
                .catch((err) => console.log(err.message));
        }

        getLinks(username);
    }, [isUser, username]);

    return <>{isUser ? <UserView user={username} /> : <ErrorPage />}</>;
}
