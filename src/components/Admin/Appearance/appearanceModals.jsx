import { UilTimes, UilAngleRight } from "@iconscout/react-unicons";
import { UploadModal } from "./uploadModal";

import { useSelector, useDispatch } from "react-redux";
import { uploadModalReducer } from "../../../features/Admin/appearance/appearanceSlice";

import { MUIModal } from "../../Modal/muiModal";

import styles from "./modal.module.scss";

export function ImageModal({ handleClose }) {
    const { uploadModal } = useSelector((state) => state.modal);
    const dispatch = useDispatch();

    function handleDragModal() {
        dispatch(uploadModalReducer());
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
                open={uploadModal}
                component={UploadModal}
            />
        </section>
    );
}
