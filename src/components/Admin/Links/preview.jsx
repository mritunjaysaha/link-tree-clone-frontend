import { useState } from "react";
import { useSelector } from "react-redux";
import { UilTimes } from "@iconscout/react-unicons";

import { UserViewContents } from "../../UserView";
import linktree from "../../../assets/linktree.svg";

import styles from "./preview.module.scss";

function PreviewNav() {
    const [isClicked, setIsClicked] = useState(false);

    const { username } = useSelector((state) => state.user);

    const link = `https://link-tree-clone.vercel.app/${username}`;

    return (
        <>
            <nav className={styles.previewNav}>
                <p>
                    My Link:&nbsp;
                    <span>{link}</span>
                </p>
                <button
                    className={styles.previewShareButton}
                    onClick={() => {
                        setIsClicked(!isClicked);
                    }}
                >
                    Share
                </button>
            </nav>
            {isClicked && (
                <div className={styles.shareModal}>
                    <header>
                        <p>Share your linktree</p>
                        <div
                            onClick={() => {
                                setIsClicked(false);
                            }}
                        >
                            <UilTimes className="fontawesome-icon" />
                        </div>
                    </header>
                    <ul>
                        <li>
                            <div className={styles.copyLinkContainer}>
                                <div>
                                    <img src={linktree} alt="linktree" />
                                    <p>{link}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        navigator.clipboard
                                            .writeText(link)
                                            .then(() =>
                                                console.log(
                                                    "text copied to clipboard"
                                                )
                                            )
                                            .catch((err) =>
                                                console.log(
                                                    "failed copying text to clipboard",
                                                    err.message
                                                )
                                            );
                                    }}
                                >
                                    Copy
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
}

function MobilePreview() {
    const { user } = useSelector((state) => state);

    return (
        <section className={styles.previewMobile}>
            <div className={styles.mobileOuter}>
                <UserViewContents user={user} isPreview={true} />
            </div>
        </section>
    );
}

export function Preview() {
    return (
        <>
            <PreviewNav />
            <MobilePreview />
        </>
    );
}
