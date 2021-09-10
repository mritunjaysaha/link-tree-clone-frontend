import { UilTimes, UilAngleRight } from "@iconscout/react-unicons";
import { UploadModal } from "./uploadModal";

import { useSelector, useDispatch } from "react-redux";
import { uploadModalReducer } from "../../../features/Admin/appearance/appearanceSlice";

import { MUIModal } from "../../Modal/muiModal";
import { UilScenery } from "@iconscout/react-unicons";

import styles from "./selectImageModal.module.scss";

export function SelectImageModal({ handleClose }) {
    const { uploadModal } = useSelector((state) => state.modal);
    const dispatch = useDispatch();

    function handleDragModal() {
        dispatch(uploadModalReducer());
    }

    return (
        <section className={styles.selectImageModalSection}>
            <div className>
                <p>Upload Profile Image</p>
                <UilTimes onClick={handleClose} className={styles.adminIcon} />
            </div>
            <div className={styles.container} onClick={handleDragModal}>
                <UilScenery className={styles.iconScenery} />
                <div className={styles.contents}>
                    <div className={styles.text}>
                        <h3>Upload your own image</h3>
                        <p>From your computer</p>
                    </div>
                    <div className={styles.icon}>
                        <UilAngleRight className={styles.adminIcon} />
                    </div>
                </div>
            </div>
            <MUIModal
                handleClose={handleDragModal}
                open={uploadModal}
                component={UploadModal}
            />
        </section>
    );
}
