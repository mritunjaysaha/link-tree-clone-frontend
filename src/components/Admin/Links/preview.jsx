import { useState } from "react";
import { useSelector } from "react-redux";
import {
    UilTimes,
    UilQrcodeScan,
    UilAngleRightB,
    UilAngleLeftB,
} from "@iconscout/react-unicons";
import QRCode from "react-qr-code";
import { UserViewContents } from "../../UserView";
import linktree from "../../../assets/linktree.svg";

import styles from "./preview.module.scss";

function ShareModal({ handleShareModalClick, handleQRModalClicked, link }) {
    function handleCopy() {
        navigator.clipboard
            .writeText(link)
            .then(() => console.log("text copied to clipboard"))
            .catch((err) =>
                console.log("failed copying text to clipboard", err.message)
            );
    }

    return (
        <>
            <header>
                <p className={styles.headerMid}>Share your linktree</p>
                <div
                    className={styles.headerRight}
                    onClick={handleShareModalClick}
                >
                    <UilTimes className="fontawesome-icon" />
                </div>
            </header>
            <ul>
                <li className={styles.QRLi} onClick={handleQRModalClicked}>
                    <div>
                        <UilQrcodeScan className={styles.QRCode} />
                        <p>QR Code</p>
                    </div>
                    <UilAngleRightB />
                </li>

                <li>
                    <div className={styles.copyLinkContainer}>
                        <div>
                            <img src={linktree} alt="linktree" />
                            <p>{link}</p>
                        </div>
                        <button onClick={handleCopy}>Copy</button>
                    </div>
                </li>
            </ul>
        </>
    );
}

function PreviewNav() {
    const [isClicked, setIsClicked] = useState(false);
    const [isQRCode, setIsQRCode] = useState(false);

    const { username } = useSelector((state) => state.user);

    const link = `https://link-tree-clone.vercel.app/${username}`;

    function handleShareModalClick() {
        setIsClicked(false);
        setIsQRCode(false);
    }

    function handleQRModalClicked() {
        setIsQRCode(true);
    }

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
                    {!isQRCode ? (
                        <ShareModal
                            handleQRModalClicked={handleQRModalClicked}
                            handleShareModalClick={handleShareModalClick}
                            link={link}
                        />
                    ) : (
                        <>
                            <header>
                                <div
                                    className={styles.headerLeft}
                                    onClick={() => {
                                        setIsQRCode(!isQRCode);
                                    }}
                                >
                                    <UilAngleLeftB />
                                </div>
                                <p className={styles.headerMid}>QR Code</p>

                                <div
                                    className={styles.headerRight}
                                    onClick={handleShareModalClick}
                                >
                                    <UilTimes className="fontawesome-icon" />
                                </div>
                            </header>
                            <div className={styles.QRCodeContainer}>
                                <p>Here is the QR code for your link</p>
                                <div className={styles.QRCodeDiv}>
                                    <QRCode value={link} />
                                </div>
                                <p>{link}</p>
                                <button>Download QR Code</button>
                            </div>
                        </>
                    )}
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
