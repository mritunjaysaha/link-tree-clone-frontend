import { UilFilePlus, UilTimes, UilLaptop } from "@iconscout/react-unicons";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { ImageCropper } from "./imageCropper";
import { useSelector, useDispatch } from "react-redux";
import {
    uploadModalReducer,
    cropModalReducer,
    pickModalReducer,
} from "../../../features/Admin/appearance/appearanceSlice";

import styles from "./uploadModal.module.scss";

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
                <div className={styles.navItem}>
                    <UilLaptop className={styles.adminIcon} />
                    <div className={styles.hamburgerMenu}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <span>My Device</span>
                </div>
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

export function UploadModal() {
    const { cropModal } = useSelector((state) => state.modal);
    const dispatch = useDispatch();

    const [files, setFiles] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        setFiles(
            acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            )
        );
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    useEffect(() => {
        if (files.length === 1) {
            dispatch(cropModalReducer());
        }

        return () => {
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        };
    }, [files, dispatch]);

    return (
        <section className={styles.uploadModalContainer}>
            {files.length && cropModal ? (
                <ImageCropper image={files[0].preview} />
            ) : (
                <UploadComponent
                    getRootProps={getRootProps}
                    getInputProps={getInputProps}
                    handleClose={() => {
                        dispatch(pickModalReducer());
                        dispatch(uploadModalReducer());
                    }}
                />
            )}
        </section>
    );
}
