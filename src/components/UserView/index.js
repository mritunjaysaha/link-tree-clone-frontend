import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../features/Auth/authSlice";
import { convertToBinary } from "../../utils/convertToBinary";

import linktree from "../../assets/linktree.svg";
import styles from "./userview.module.scss";

function UserView({ user }) {
    const { photo, links, profileTitle, bio, username } = useSelector(
        (state) => state.user
    );
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            axios
                .get(`/api/user/userview/${user}`)
                .then((res) => {
                    dispatch(setUserData(res.data));
                })
                .catch((err) => console.log(err.message));
        }
    }, [user, dispatch]);

    return (
        <section className={styles.userviewSection}>
            <section className={styles.userviewInnerSection}>
                {/* User image */}
                <header>
                    <picture>
                        <img
                            src={convertToBinary(photo)}
                            alt={username ? username : ""}
                        />
                    </picture>
                    <p className={styles.profileTitleP}>
                        {profileTitle ? profileTitle : `@${username}`}
                    </p>
                </header>
                <section className={styles.contentsSection}>
                    {/* bio */}
                    {bio ? <p className={styles.bio}>{bio}</p> : ""}

                    {/* links */}
                    {links.length > 0 ? (
                        <ul className={styles.linksContainer}>
                            {links.map((link) => (
                                <a
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    href={link.url ? link.url : ""}
                                >
                                    <li key={link.order}>{link.name}</li>
                                </a>
                            ))}
                        </ul>
                    ) : (
                        ""
                    )}
                </section>
                <footer>
                    <img src={linktree} alt="linktree" />
                    <p>linktree</p>
                </footer>
            </section>
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
