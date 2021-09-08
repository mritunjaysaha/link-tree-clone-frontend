import { useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import {
    UilTimes,
    UilQrcodeScan,
    UilAngleRightB,
    UilAngleLeftB,
} from "@iconscout/react-unicons";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";
import { UserViewContents } from "../../UserView";
import linktree from "../../../assets/linktree.svg";

import styles from "./preview.module.scss";

function ShareModal({ handleShareModalClick, handleQRModalClicked, link }) {
    const [copyText, setCopyText] = useState("Copy");

    function handleCopy() {
        navigator.clipboard
            .writeText(link)
            .then(() => {
                setCopyText("Copied");
                setTimeout(() => {
                    setCopyText("Copy");
                }, 3000);
            })
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
                        <button onClick={handleCopy}>{copyText}</button>
                    </div>
                </li>
            </ul>
        </>
    );
}

function QRCodeModal({
    link,
    username,
    handleQRModalClicked,
    handleShareModalClick,
}) {
    const ref = useRef();

    function downloadImage() {
        if (ref.current === null) return;

        toPng(ref.current, { cacheBust: true })
            .then((dataUrl) => {
                console.log("downloaded");
                const link = document.createElement("a");
                link.download = `${username}-qr-code.png`;
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => console.log("failed to download"));
    }

    return (
        <>
            <header>
                <div
                    className={styles.headerLeft}
                    onClick={handleQRModalClicked}
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
                <div ref={ref} className={styles.QRCodeDiv}>
                    <QRCode value={link} />
                </div>
                <p>{link}</p>
                <button onClick={downloadImage}>Download QR Code</button>
            </div>
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
        setIsQRCode(!isQRCode);
    }

    return (
        <>
            <nav className={styles.previewNav}>
                <p className={styles.lineClamp}>
                    My Link:&nbsp;
                    <span>
                        <a
                            rel="noopener noreferrer"
                            target="_blank"
                            href={link}
                        >
                            {link}
                        </a>
                    </span>
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
                <div className={styles.shareModalContainer}>
                    <div className={styles.shareModal}>
                        {!isQRCode ? (
                            <ShareModal
                                handleQRModalClicked={handleQRModalClicked}
                                handleShareModalClick={handleShareModalClick}
                                link={link}
                            />
                        ) : (
                            <QRCodeModal
                                link={link}
                                username={username}
                                handleQRModalClicked={handleQRModalClicked}
                                handleShareModalClick={handleShareModalClick}
                            />
                        )}
                    </div>
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
