import styles from "./uploadModal.module.scss";
import { UilFilePlus, UilTimes, UilLaptop } from "@iconscout/react-unicons";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { ImageCropper } from "./imageCropper";

/**
 *
 * @param {getRootProps} getRootProps - Pass useDropzone's getRootProps
 * @param {getInputProps} getInputProps - Pass useDropzone's getInputProps
 * @returns
 */
function UploadComponent({ getRootProps, getInputProps, handleClose }) {
    return (
        <>
            <nav>
                <p className={styles.navActive}>
                    <UilLaptop className={styles.adminIcon} />
                    <span>My Device</span>
                </p>
            </nav>
            <section className={styles.contentsSection}>
                <div className={styles.topDiv}>
                    <UilLaptop className={styles.adminIcon} />
                    <UilTimes
                        className={`${styles.adminIcon} ${styles.closeIcon}`}
                        onClick={handleClose}
                    />
                </div>
                <div {...getRootProps()} className={styles.dragComponentOuter}>
                    <input {...getInputProps()} />
                    <div className={styles.dragComponentInner}>
                        <UilFilePlus className={styles.fileIcon} />
                        <h3>Select files to upload</h3>
                        <p>or Drag and Drop, Copy and Paste Files</p>
                    </div>
                </div>
            </section>
        </>
    );
}

export function UploadModal({ handleClose }) {
    const [files, setFiles] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        console.log({ acceptedFiles });
        setFiles(
            acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            )
        );
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    useEffect(
        () => () => {
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        },
        [files]
    );

    return (
        <section className={styles.uploadModalContainer}>
            {!files.length ? (
                <UploadComponent
                    getRootProps={getRootProps}
                    getInputProps={getInputProps}
                    handleClose={handleClose}
                />
            ) : (
                <ImageCropper image={files[0].preview} />
            )}
        </section>
    );
}
