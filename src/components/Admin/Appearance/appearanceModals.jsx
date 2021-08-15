import { UilTimes, UilAngleRight } from "@iconscout/react-unicons";
import styles from "./modal.module.scss";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

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

export function PickImageModal({ handleClose, open }) {
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
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Transition modal</h2>
                        <p id="transition-modal-description">
                            react-transition-group animates me.
                        </p>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export function PickAnImageModal() {
    return (
        <section className={styles.modalInner}>
            <div>
                <p>Upload Profile Image</p>
                <UilTimes />
            </div>
            <figure>
                <img src="" alt="" />
                <figcaption>
                    <h3>Upload your own image</h3>
                    <p>From your computer</p>
                    <UilAngleRight />
                </figcaption>
            </figure>
        </section>
    );
}
