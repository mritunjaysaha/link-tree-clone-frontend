import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../features/Auth/authSlice";
import { convertToBinary } from "../../utils/convertToBinary";

import linktree from "../../assets/linktree.svg";
import placeholder from "../../assets/placeholder.png";
import styles from "./userview.module.scss";

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
            {/* User image */}
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
            <footer className={styles.footer}>
                <img src={linktree} alt="linktree" />
                <p>linktree</p>
            </footer>
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
                .catch((err) => console.log(err.message));
        }
    }, [dispatch, username]);

    return (
        <section className={styles.userviewSection}>
            <UserViewContents user={user} />
        </section>
    );
}

export function UserViewPage() {
    const { username } = useParams();

    return (
        <>
            {!username ? (
                <section>User not found</section>
            ) : (
                <UserView user={username} />
            )}
        </>
    );
}
