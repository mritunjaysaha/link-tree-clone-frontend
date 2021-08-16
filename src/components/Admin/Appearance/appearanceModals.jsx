import { UilTimes, UilAngleRight } from "@iconscout/react-unicons";
import styles from "./modal.module.scss";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useState } from "react";

import { UploadModal } from "./uploadModal";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export function MUIModal({ handleClose, open, component: Component }) {
    const classes = useStyles();

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Component handleClose={handleClose} />
                </Fade>
            </Modal>
        </div>
    );
}

export function ImageModal({ handleClose }) {
    const [openDragModal, setOpenDragModal] = useState(false);

    function handleDragModal() {
        setOpenDragModal(!openDragModal);
    }

    return (
        <section className={styles.imageModalSection}>
            <div className>
                <p>Upload Profile Image</p>
                <UilTimes onClick={handleClose} className={styles.adminIcon} />
            </div>
            <figure className={styles.container} onClick={handleDragModal}>
                <img src="" alt="" className={styles.image} />
                <figcaption className={styles.contents}>
                    <div className={styles.text}>
                        <h3>Upload your own image</h3>
                        <p>From your computer</p>
                    </div>
                    <div className={styles.icon}>
                        <UilAngleRight className={styles.adminIcon} />
                    </div>
                </figcaption>
            </figure>
            <MUIModal
                handleClose={handleDragModal}
                open={openDragModal}
                component={UploadModal}
            />
        </section>
    );
}